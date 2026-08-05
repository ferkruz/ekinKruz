import { Component, Input } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { Container } from '../../shared/ui/container/container';
import { SectionHeader } from '../../shared/ui/section-header/section-header';

@Component({
  selector: 'ek-placeholder-page',
  standalone: true,
  imports: [Container, SectionHeader, TranslocoPipe],
  template: `
    <section class="ek-placeholder">
      <ek-container>
        <ek-section-header
          [eyebrow]="eyebrowKey | transloco"
          [title]="titleKey | transloco"
          [description]="descriptionKey | transloco"
        />
        <p class="ek-mono ek-placeholder__note">{{ 'placeholder.note' | transloco }}</p>
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
  @Input({ required: true }) eyebrowKey!: string;
  @Input({ required: true }) titleKey!: string;
  @Input() descriptionKey = 'placeholder.description';
}
