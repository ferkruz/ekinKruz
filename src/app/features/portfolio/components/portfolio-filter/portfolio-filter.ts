import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { PortfolioFilter, PortfolioFilterId } from '../../data/portfolio-projects';

@Component({
  selector: 'ek-portfolio-filter',
  standalone: true,
  imports: [TranslocoPipe],
  templateUrl: './portfolio-filter.html',
  styleUrl: './portfolio-filter.css',
})
export class PortfolioFilterComponent {
  @Input({ required: true }) filters!: readonly PortfolioFilter[];
  @Input({ required: true }) activeFilter!: PortfolioFilterId;

  @Output() readonly filterChange = new EventEmitter<PortfolioFilterId>();
}
