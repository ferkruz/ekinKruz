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
  ],
  templateUrl: './portfolio-section.html',
  styleUrl: './portfolio-section.css',
})
export class PortfolioSectionComponent {
  readonly filters = PORTFOLIO_FILTERS;
  readonly projects = PORTFOLIO_PROJECTS;
  readonly activeFilter = signal<PortfolioFilterId>('all');
  readonly selectedProjectId = signal<string | null>(null);

  readonly visibleProjects = computed(() => {
    const filter = this.activeFilter();
    return this.projects.filter((project) => {
      if (project.status !== 'published') return false;
      if (filter === 'all') return true;
      return project.categories.includes(filter as PortfolioCategoryId);
    });
  });

  selectFilter(filter: PortfolioFilterId): void {
    this.activeFilter.set(filter);

    const selectedId = this.selectedProjectId();
    if (!selectedId) return;

    const projects = this.visibleProjects();
    if (!projects.some((project) => project.id === selectedId)) {
      this.selectedProjectId.set(null);
    }
  }

  selectProject(projectId: string): void {
    this.selectedProjectId.update((selectedProjectId) =>
      selectedProjectId === projectId ? null : projectId,
    );
  }
}
