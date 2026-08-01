import { Component } from '@angular/core';
import { PlaceholderPage } from '../shared/placeholder-page';

@Component({
  selector: 'ek-about-page',
  standalone: true,
  imports: [PlaceholderPage],
  template: `
    <ek-placeholder-page
      eyebrow="Nosotros"
      title="Innovación. Arquitectura. Calidad."
      description="Filosofía de producto y engineering — sin texto genérico."
    />
  `,
})
export class AboutPage {}
