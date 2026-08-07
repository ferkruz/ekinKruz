import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { RevealDirective } from '../../../../shared/motion/reveal.directive';
import { SignalTiltDirective } from '../../../../shared/motion/signal-tilt.directive';
import { PortfolioProject } from '../../data/portfolio-projects';

@Component({
  selector: 'ek-portfolio-project',
  standalone: true,
  imports: [RevealDirective, SignalTiltDirective, TranslocoPipe],
  templateUrl: './portfolio-project.html',
  styleUrl: './portfolio-project.css',
})
export class PortfolioProjectComponent {
  @Input({ required: true }) project!: PortfolioProject;
  @Input() selected = false;
  @Input() index = 0;

  @Output() readonly selectProject = new EventEmitter<string>();

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
