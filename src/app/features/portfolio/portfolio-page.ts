import { Component } from '@angular/core';
import { PlaceholderPage } from '../shared/placeholder-page';

@Component({
  selector: 'ek-portfolio-page',
  standalone: true,
  imports: [PlaceholderPage],
  template: `
    <ek-placeholder-page
      eyebrowKey="portfolio.eyebrow"
      titleKey="portfolio.title"
      descriptionKey="portfolio.description"
    />
  `,
})
export class PortfolioPage {}
