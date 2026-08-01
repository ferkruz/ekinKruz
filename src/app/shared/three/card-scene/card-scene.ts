import {
  afterNextRender,
  Component,
  ElementRef,
  inject,
  Input,
  OnDestroy,
  signal,
  viewChild,
} from '@angular/core';
import { CardSceneEngine } from './card-scene.engine';

@Component({
  selector: 'ek-card-scene',
  standalone: true,
  templateUrl: './card-scene.html',
  styleUrl: './card-scene.css',
})
export class CardScene implements OnDestroy {
  @Input() accent: 'signal' | 'trust' = 'signal';

  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');

  readonly ready = signal(false);
  readonly failed = signal(false);

  private engine: CardSceneEngine | null = null;
  private resizeObserver: ResizeObserver | null = null;
  private visibilityObserver: IntersectionObserver | null = null;
  private trackRoot: HTMLElement | null = null;
  private reducedMotion = false;

  private readonly onEnter = (): void => this.engine?.setInteractive(true);
  private readonly onLeave = (): void => this.engine?.setInteractive(false);
  private readonly onMove = (event: PointerEvent): void => {
    if (!this.trackRoot) return;
    const rect = this.trackRoot.getBoundingClientRect();
    const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
    this.engine?.setPointer(nx, ny);
  };

  constructor() {
    afterNextRender(() => this.init());
  }

  ngOnDestroy(): void {
    this.teardown();
  }

  private init(): void {
    if (typeof window === 'undefined') return;

    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canvas = this.canvasRef().nativeElement;

    try {
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (!gl) {
        this.failed.set(true);
        return;
      }

      this.engine = new CardSceneEngine({
        canvas,
        reducedMotion: this.reducedMotion,
        accent: this.accent,
      });

      const { width, height } = this.host.nativeElement.getBoundingClientRect();
      this.engine.resize(width, height);
      this.ready.set(true);

      const trackRoot =
        (this.host.nativeElement.closest('.ek-signal-tilt') as HTMLElement | null) ??
        this.host.nativeElement;
      this.trackRoot = trackRoot;
      trackRoot.addEventListener('pointerenter', this.onEnter);
      trackRoot.addEventListener('pointerleave', this.onLeave);
      trackRoot.addEventListener('pointermove', this.onMove, { passive: true });

      this.resizeObserver = new ResizeObserver(([entry]) => {
        if (!entry) return;
        this.engine?.resize(entry.contentRect.width, entry.contentRect.height);
      });
      this.resizeObserver.observe(this.host.nativeElement);

      this.visibilityObserver = new IntersectionObserver(
        ([entry]) => {
          if (!this.engine) return;
          if (entry.isIntersecting) this.engine.start();
          else this.engine.stop();
        },
        { threshold: 0.2 },
      );
      this.visibilityObserver.observe(this.host.nativeElement);
    } catch {
      this.failed.set(true);
      this.engine?.dispose();
      this.engine = null;
    }
  }

  private teardown(): void {
    this.trackRoot?.removeEventListener('pointerenter', this.onEnter);
    this.trackRoot?.removeEventListener('pointerleave', this.onLeave);
    this.trackRoot?.removeEventListener('pointermove', this.onMove);
    this.trackRoot = null;
    this.resizeObserver?.disconnect();
    this.visibilityObserver?.disconnect();
    this.engine?.dispose();
    this.engine = null;
  }
}
