import {
  afterNextRender,
  Component,
  ElementRef,
  OnDestroy,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { setupAboutDiamondMotion } from './about-diamond.animator';
import type { AboutDiamondMotionCleanup } from './about-diamond.animator';
import { AboutDiamondEngine } from './about-diamond.engine';
import { DiamondPointerController } from './about-diamond.pointer';

interface AboutDiamondValue {
  readonly labelKey: string;
  readonly x: string;
  readonly y: string;
}

@Component({
  selector: 'ek-about-diamond',
  standalone: true,
  imports: [TranslocoPipe],
  templateUrl: './about-diamond.html',
  styleUrl: './about-diamond.css',
})
export class AboutDiamondComponent implements OnDestroy {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');

  readonly values: readonly AboutDiamondValue[] = [
    { labelKey: 'about.diamond.values.innovation', x: '-34%', y: '-32%' },
    { labelKey: 'about.diamond.values.engineering', x: '31%', y: '-33%' },
    { labelKey: 'about.diamond.values.experience', x: '-38%', y: '4%' },
    { labelKey: 'about.diamond.values.scalability', x: '38%', y: '2%' },
    { labelKey: 'about.diamond.values.quality', x: '-25%', y: '34%' },
    { labelKey: 'about.diamond.values.evolution', x: '28%', y: '34%' },
  ];

  readonly ready = signal(false);
  readonly failed = signal(false);
  readonly activeIndex = signal(0);
  readonly activeValue = computed(() => this.values[this.activeIndex()] ?? this.values[0]);

  private engine: AboutDiamondEngine | null = null;
  private pointer: DiamondPointerController | null = null;
  private resizeObserver: ResizeObserver | null = null;
  private visibilityObserver: IntersectionObserver | null = null;
  private motionCleanup: AboutDiamondMotionCleanup | null = null;
  private reducedMotion = false;
  private destroyed = false;

  constructor() {
    afterNextRender(() => {
      void this.init();
    });
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    this.teardown();
  }

  private async init(): Promise<void> {
    if (typeof window === 'undefined') return;

    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canvas = this.canvasRef().nativeElement;

    try {
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (!gl) {
        this.failed.set(true);
        return;
      }

      this.engine = new AboutDiamondEngine({
        canvas,
        reducedMotion: this.reducedMotion,
        valueCount: this.values.length,
        onValueChange: (index) => this.activeIndex.set(index),
      });

      const bounds = this.host.nativeElement.getBoundingClientRect();
      this.engine.resize(bounds.width, bounds.height);
      this.engine.start();
      this.ready.set(true);

      this.pointer = new DiamondPointerController(this.host.nativeElement, (nx, ny) => {
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

      this.motionCleanup = await setupAboutDiamondMotion(
        this.host.nativeElement,
        this.reducedMotion,
      );

      if (this.destroyed) this.teardown();
    } catch {
      this.failed.set(true);
      this.teardown();
    }
  }

  private teardown(): void {
    this.motionCleanup?.();
    this.pointer?.disconnect();
    this.resizeObserver?.disconnect();
    this.visibilityObserver?.disconnect();
    this.engine?.dispose();

    this.motionCleanup = null;
    this.pointer = null;
    this.resizeObserver = null;
    this.visibilityObserver = null;
    this.engine = null;
  }
}
