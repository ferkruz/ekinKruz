import {
  Component,
  ElementRef,
  OnDestroy,
  afterNextRender,
  inject,
  input,
  signal,
} from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { Container } from '../../../../shared/ui/container/container';
import { MethodologyStage } from '../../data/methodology-stages';
import {
  MethodologyCleanup,
  setupMethodologyScroll,
} from '../../animations/methodology-scroll.animator';
import { MethodologyStageVisual } from '../methodology-stage-visual/methodology-stage-visual';

@Component({
  selector: 'ek-methodology-experience',
  standalone: true,
  imports: [Container, MethodologyStageVisual, TranslocoPipe],
  templateUrl: './methodology-experience.html',
  styleUrl: './methodology-experience.css',
})
export class MethodologyExperience implements OnDestroy {
  readonly stages = input.required<readonly MethodologyStage[]>();
  readonly activeIndex = signal(0);

  private readonly host = inject(ElementRef<HTMLElement>);
  private cleanup: MethodologyCleanup | null = null;
  private destroyed = false;

  constructor() {
    afterNextRender(() => {
      void this.setupMotion();
    });
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    this.cleanup?.();
  }

  private async setupMotion(): Promise<void> {
    const cleanup = await setupMethodologyScroll(this.host.nativeElement, (index) => {
      this.activeIndex.set(index);
    });

    if (this.destroyed) {
      cleanup();
      return;
    }

    this.cleanup = cleanup;
  }
}
