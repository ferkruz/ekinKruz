import { Component } from '@angular/core';
import { PlaceholderPage } from '../shared/placeholder-page';

@Component({
  selector: 'ek-blog-page',
  standalone: true,
  imports: [PlaceholderPage],
  template: `
    <ek-placeholder-page
      eyebrow="Blog"
      title="Pensamiento técnico con impacto comercial."
      description="Estructura SEO lista en una iteración posterior."
    />
  `,
})
export class BlogPage {}
