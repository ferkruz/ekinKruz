import { Directive, ElementRef, HostListener, OnDestroy, inject } from '@angular/core';

/**
 * Hero-like pointer tilt via CSS variables + rAF lerp.
 */
@Directive({
  selector: '[ekSignalTilt]',
  standalone: true,
})
export class SignalTiltDirective implements OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  private targetX = 0;
  private targetY = 0;
  private currentX = 0;
  private currentY = 0;
  private glowX = 50;
  private glowY = 50;
  private targetGlowX = 50;
  private targetGlowY = 50;
  private frameId = 0;
  private active = false;

  constructor() {
    const node = this.el.nativeElement;
    node.style.setProperty('--ek-tilt-x', '0deg');
    node.style.setProperty('--ek-tilt-y', '0deg');
    node.style.setProperty('--ek-glow-x', '50%');
    node.style.setProperty('--ek-glow-y', '50%');
    node.classList.add('ek-signal-tilt');
  }

  ngOnDestroy(): void {
    this.stop();
  }

  @HostListener('pointerenter')
  onEnter(): void {
    if (this.reducedMotion) return;
    this.active = true;
    this.start();
  }

  @HostListener('pointerleave')
  onLeave(): void {
    this.active = false;
    this.targetX = 0;
    this.targetY = 0;
    this.targetGlowX = 50;
    this.targetGlowY = 50;
    this.start();
  }

  @HostListener('pointermove', ['$event'])
  onMove(event: PointerEvent): void {
    if (this.reducedMotion) return;
    const rect = this.el.nativeElement.getBoundingClientRect();
    const nx = (event.clientX - rect.left) / rect.width;
    const ny = (event.clientY - rect.top) / rect.height;
    this.targetY = (nx - 0.5) * 10;
    this.targetX = (0.5 - ny) * 8;
    this.targetGlowX = nx * 100;
    this.targetGlowY = ny * 100;
    this.start();
  }

  private start(): void {
    if (this.frameId || this.reducedMotion) return;
    this.frameId = requestAnimationFrame(this.tick);
  }

  private stop(): void {
    if (this.frameId) cancelAnimationFrame(this.frameId);
    this.frameId = 0;
  }

  private readonly tick = (): void => {
    this.frameId = 0;
    this.currentX += (this.targetX - this.currentX) * 0.08;
    this.currentY += (this.targetY - this.currentY) * 0.08;
    this.glowX += (this.targetGlowX - this.glowX) * 0.1;
    this.glowY += (this.targetGlowY - this.glowY) * 0.1;

    const node = this.el.nativeElement;
    node.style.setProperty('--ek-tilt-x', `${this.currentX.toFixed(2)}deg`);
    node.style.setProperty('--ek-tilt-y', `${this.currentY.toFixed(2)}deg`);
    node.style.setProperty('--ek-glow-x', `${this.glowX.toFixed(1)}%`);
    node.style.setProperty('--ek-glow-y', `${this.glowY.toFixed(1)}%`);

    const settling =
      Math.abs(this.targetX - this.currentX) > 0.01 ||
      Math.abs(this.targetY - this.currentY) > 0.01 ||
      Math.abs(this.targetGlowX - this.glowX) > 0.2;

    if (this.active || settling) {
      this.frameId = requestAnimationFrame(this.tick);
    }
  };
}
