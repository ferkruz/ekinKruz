import {
  afterNextRender,
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  inject,
} from '@angular/core';

/**
 * Scroll reveal: fade + blur + translateY with optional stagger delay.
 * Uses IntersectionObserver; respects prefers-reduced-motion.
 */
@Directive({
  selector: '[ekReveal]',
  standalone: true,
})
export class RevealDirective implements OnDestroy {
  @Input() ekRevealDelay = 0;

  private readonly el = inject(ElementRef<HTMLElement>);
  private observer: IntersectionObserver | null = null;
  private reducedMotion = false;

  constructor() {
    afterNextRender(() => this.setup());
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private setup(): void {
    const node = this.el.nativeElement;
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (this.reducedMotion) {
      node.classList.add('ek-reveal', 'ek-reveal--visible');
      return;
    }

    node.classList.add('ek-reveal');
    node.style.setProperty('--ek-reveal-delay', `${this.ekRevealDelay}ms`);

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          node.classList.add('ek-reveal--visible');
          this.observer?.unobserve(node);
        }
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' },
    );
    this.observer.observe(node);
  }
}
