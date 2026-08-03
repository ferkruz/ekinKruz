import {
  afterNextRender,
  Component,
  ElementRef,
  OnDestroy,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { ContactMapEngine } from './contact-map.engine';
import { ContactMapPointerController } from './contact-map.pointer';

@Component({
  selector: 'ek-contact-map',
  standalone: true,
  templateUrl: './contact-map.html',
  styleUrl: './contact-map.css',
})
export class ContactMapComponent implements OnDestroy {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');

  readonly ready = signal(false);
  readonly failed = signal(false);

  private engine: ContactMapEngine | null = null;
  private pointer: ContactMapPointerController | null = null;
  private resizeObserver: ResizeObserver | null = null;
  private visibilityObserver: IntersectionObserver | null = null;
  private reducedMotion = false;

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

      this.engine = new ContactMapEngine({
        canvas,
        reducedMotion: this.reducedMotion,
      });

      const bounds = this.host.nativeElement.getBoundingClientRect();
      this.engine.resize(bounds.width, bounds.height);
      this.engine.start();
      this.ready.set(true);

      this.pointer = new ContactMapPointerController(this.host.nativeElement, (nx, ny) => {
        this.engine?.setPointer(nx, ny);
      });
      this.pointer.connect();

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
        { threshold: 0.12 },
      );
      this.visibilityObserver.observe(this.host.nativeElement);
    } catch {
      this.failed.set(true);
      this.teardown();
    }
  }

  private teardown(): void {
    this.pointer?.disconnect();
    this.resizeObserver?.disconnect();
    this.visibilityObserver?.disconnect();
    this.engine?.dispose();

    this.pointer = null;
    this.resizeObserver = null;
    this.visibilityObserver = null;
    this.engine = null;
  }
}
