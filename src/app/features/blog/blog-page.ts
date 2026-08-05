import { Component } from '@angular/core';
import { PlaceholderPage } from '../shared/placeholder-page';

@Component({
  selector: 'ek-blog-page',
  standalone: true,
  imports: [PlaceholderPage],
  template: `
    <ek-placeholder-page
      eyebrowKey="blog.eyebrow"
      titleKey="blog.title"
      descriptionKey="blog.description"
    />
  `,
})
export class BlogPage {}
