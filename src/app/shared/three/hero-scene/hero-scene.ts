import {
  afterNextRender,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  signal,
  viewChild,
} from '@angular/core';
import { HeroSceneEngine } from './hero-scene.engine';

@Component({
  selector: 'ek-hero-scene',
  standalone: true,
  templateUrl: './hero-scene.html',
  styleUrl: './hero-scene.css',
})
export class HeroScene implements OnDestroy {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');

  readonly ready = signal(false);
  readonly failed = signal(false);
  readonly reducedMotion = signal(false);

  private engine: HeroSceneEngine | null = null;
  private resizeObserver: ResizeObserver | null = null;
  private visibilityObserver: IntersectionObserver | null = null;
  private motionQuery: MediaQueryList | null = null;
  private readonly onPointerMove = (event: PointerEvent): void => {
    const rect = this.host.nativeElement.getBoundingClientRect();
    const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
    this.engine?.setPointer(nx, ny);
  };
  private readonly onMotionChange = (event: MediaQueryListEvent): void => {
    this.reducedMotion.set(event.matches);
  };

  constructor() {
    afterNextRender(() => this.init());
  }

  ngOnDestroy(): void {
    this.teardown();
  }

  private init(): void {
    if (typeof window === 'undefined') return;

    this.motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.reducedMotion.set(this.motionQuery.matches);
    this.motionQuery.addEventListener('change', this.onMotionChange);

    const canvas = this.canvasRef().nativeElement;

    try {
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (!gl) {
        this.failed.set(true);
        return;
      }

      this.engine = new HeroSceneEngine({
        canvas,
        reducedMotion: this.reducedMotion(),
      });

      const bounds = this.host.nativeElement.getBoundingClientRect();
      this.engine.resize(bounds.width, bounds.height);
      this.engine.start();
      this.ready.set(true);

      this.resizeObserver = new ResizeObserver((entries) => {
        const entry = entries[0];
        if (!entry) return;
        const { width, height } = entry.contentRect;
        this.engine?.resize(width, height);
      });
      this.resizeObserver.observe(this.host.nativeElement);

      this.visibilityObserver = new IntersectionObserver(
        ([entry]) => {
          if (!this.engine) return;
          if (entry.isIntersecting) this.engine.start();
          else this.engine.stop();
        },
        { threshold: 0.05 },
      );
      this.visibilityObserver.observe(this.host.nativeElement);

      // Pointer on window so hero stays reactive even when canvas is pointer-events:none
      window.addEventListener('pointermove', this.onPointerMove, { passive: true });
    } catch {
      this.failed.set(true);
      this.teardownEngine();
    }
  }

  private teardown(): void {
    window.removeEventListener('pointermove', this.onPointerMove);
    this.motionQuery?.removeEventListener('change', this.onMotionChange);
    this.resizeObserver?.disconnect();
    this.visibilityObserver?.disconnect();
    this.resizeObserver = null;
    this.visibilityObserver = null;
    this.motionQuery = null;
    this.teardownEngine();
  }

  private teardownEngine(): void {
    this.engine?.dispose();
    this.engine = null;
  }
}
