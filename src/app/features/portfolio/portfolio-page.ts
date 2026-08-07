import { Component } from '@angular/core';
import { PortfolioSectionComponent } from './components/portfolio-section/portfolio-section';

@Component({
  selector: 'ek-portfolio-page',
  standalone: true,
  imports: [PortfolioSectionComponent],
  template: '<ek-portfolio-section />',
})
export class PortfolioPage {}
