import { Component, Input } from '@angular/core';
import { Container } from '../../shared/ui/container/container';
import { SectionHeader } from '../../shared/ui/section-header/section-header';

@Component({
  selector: 'ek-placeholder-page',
  standalone: true,
  imports: [Container, SectionHeader],
  template: `
    <section class="ek-placeholder">
      <ek-container>
        <ek-section-header [eyebrow]="eyebrow" [title]="title" [description]="description" />
        <p class="ek-mono ek-placeholder__note">En construcción — próxima iteración</p>
      </ek-container>
    </section>
  `,
  styles: `
    .ek-placeholder {
      padding-block: var(--ek-section-y);
      min-height: calc(100svh - var(--ek-header-h) - 12rem);
    }

    .ek-placeholder__note {
      margin-top: var(--ek-space-7);
      color: var(--ek-text-muted);
    }
  `,
})
export class PlaceholderPage {
  @Input({ required: true }) eyebrow!: string;
  @Input({ required: true }) title!: string;
  @Input() description = 'Esta sección se construirá en una iteración posterior.';
}
