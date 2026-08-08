import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
  afterNextRender,
  inject,
  Injector,
} from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { RevealDirective } from '../../../../shared/motion/reveal.directive';
import { SignalTiltDirective } from '../../../../shared/motion/signal-tilt.directive';
import { PortfolioProject } from '../../data/portfolio-projects';
import { PortfolioProjectDetailComponent } from '../portfolio-project-detail/portfolio-project-detail';

@Component({
  selector: 'ek-portfolio-project',
  standalone: true,
  imports: [RevealDirective, SignalTiltDirective, TranslocoPipe, PortfolioProjectDetailComponent],
  templateUrl: './portfolio-project.html',
  styleUrl: './portfolio-project.css',
})
export class PortfolioProjectComponent implements OnChanges {
  private readonly injector = inject(Injector);

  @Input({ required: true }) project!: PortfolioProject;
  @Input() selected = false;
  @Input() index = 0;

  @Output() readonly selectProject = new EventEmitter<string>();

  @ViewChild('detailPanel') private detailPanel?: ElementRef<HTMLElement>;

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['selected']?.currentValue) return;

    afterNextRender(
      () => {
        this.detailPanel?.nativeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'nearest',
        });
      },
      { injector: this.injector },
    );
  }

  onImageError(event: Event): void {
    const image = event.target as HTMLImageElement;
    const assetPath = this.project.image.replace(/^\/+/, '');
    const initialPath = image.getAttribute('src') ?? '';

    if (initialPath.startsWith('/') && !image.dataset['fallbackBase'] && typeof document !== 'undefined') {
      image.dataset['fallbackBase'] = 'true';
      image.src = new URL(assetPath, document.baseURI).toString();
      return;
    }

    if (!image.dataset['fallbackRoot']) {
      image.dataset['fallbackRoot'] = 'true';
      image.src = `/${assetPath}`;
      return;
    }

    if (!image.dataset['fallbackBase'] && typeof document !== 'undefined') {
      image.dataset['fallbackBase'] = 'true';
      image.src = new URL(assetPath, document.baseURI).toString();
    }
  }
}
