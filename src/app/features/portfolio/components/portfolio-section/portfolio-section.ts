import { Component, computed, signal } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { Container } from '../../../../shared/ui/container/container';
import { Button } from '../../../../shared/ui/button/button';
import { RevealDirective } from '../../../../shared/motion/reveal.directive';
import {
  PORTFOLIO_FILTERS,
  PORTFOLIO_PROJECTS,
  PortfolioCategoryId,
  PortfolioFilterId,
} from '../../data/portfolio-projects';
import { PortfolioFilterComponent } from '../portfolio-filter/portfolio-filter';
import { PortfolioProjectComponent } from '../portfolio-project/portfolio-project';
import { PortfolioProjectDetailComponent } from '../portfolio-project-detail/portfolio-project-detail';

@Component({
  selector: 'ek-portfolio-section',
  standalone: true,
  imports: [
    TranslocoPipe,
    Container,
    Button,
    RevealDirective,
    PortfolioFilterComponent,
    PortfolioProjectComponent,
    PortfolioProjectDetailComponent,
  ],
  templateUrl: './portfolio-section.html',
  styleUrl: './portfolio-section.css',
})
export class PortfolioSectionComponent {
  readonly filters = PORTFOLIO_FILTERS;
  readonly projects = PORTFOLIO_PROJECTS;
  readonly activeFilter = signal<PortfolioFilterId>('all');
  readonly selectedProjectId = signal('logistica');

  readonly visibleProjects = computed(() => {
    const filter = this.activeFilter();
    return this.projects.filter((project) => {
      if (project.status !== 'published') return false;
      if (filter === 'all') return true;
      return project.categories.includes(filter as PortfolioCategoryId);
    });
  });

  readonly selectedProject = computed(() => {
    const projects = this.visibleProjects();
    return (
      projects.find((project) => project.id === this.selectedProjectId()) ??
      projects[0] ??
      null
    );
  });

  selectFilter(filter: PortfolioFilterId): void {
    this.activeFilter.set(filter);

    const projects = this.visibleProjects();
    if (!projects.some((project) => project.id === this.selectedProjectId())) {
      this.selectedProjectId.set(projects[0]?.id ?? '');
    }
  }

  selectProject(projectId: string): void {
    this.selectedProjectId.set(projectId);
  }
}
