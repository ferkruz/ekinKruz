import { Component } from '@angular/core';
import { PlaceholderPage } from '../shared/placeholder-page';

@Component({
  selector: 'ek-portfolio-page',
  standalone: true,
  imports: [PlaceholderPage],
  template: `
    <ek-placeholder-page
      eyebrow="Portfolio"
      title="Casos destacados."
      description="Smart City, Industrial Explorer y Real Estate Configurator."
    />
  `,
})
export class PortfolioPage {}
