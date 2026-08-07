import { Component, Input } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { PortfolioProject } from '../../data/portfolio-projects';

@Component({
  selector: 'ek-portfolio-project-detail',
  standalone: true,
  imports: [TranslocoPipe],
  templateUrl: './portfolio-project-detail.html',
  styleUrl: './portfolio-project-detail.css',
})
export class PortfolioProjectDetailComponent {
  @Input({ required: true }) project!: PortfolioProject;
}
