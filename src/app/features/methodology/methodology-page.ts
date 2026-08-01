import { Component } from '@angular/core';
import { PlaceholderPage } from '../shared/placeholder-page';

@Component({
  selector: 'ek-methodology-page',
  standalone: true,
  imports: [PlaceholderPage],
  template: `
    <ek-placeholder-page
      eyebrow="Metodología"
      title="Del descubrimiento a la evolución."
      description="Timeline horizontal cinematográfico en una iteración dedicada."
    />
  `,
})
export class MethodologyPage {}
