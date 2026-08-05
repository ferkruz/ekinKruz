import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { Container } from '../../ui/container/container';

@Component({
  selector: 'ek-site-footer',
  standalone: true,
  imports: [RouterLink, Container, TranslocoPipe],
  templateUrl: './site-footer.html',
  styleUrl: './site-footer.css',
})
export class SiteFooter {
  readonly year = new Date().getFullYear();

  readonly columns = [
    {
      titleKey: 'footer.columns.company.title',
      links: [
        { labelKey: 'footer.columns.company.links.about', path: '/nosotros' },
        { labelKey: 'footer.columns.company.links.methodology', path: '/metodologia' },
        { labelKey: 'footer.columns.company.links.blog', path: '/blog' },
        { labelKey: 'footer.columns.company.links.contact', path: '/contacto' },
      ],
    },
    {
      titleKey: 'footer.columns.capabilities.title',
      links: [
        { labelKey: 'footer.columns.capabilities.links.softwareFactory', path: '/servicios' },
        { labelKey: 'footer.columns.capabilities.links.spatial', path: '/servicios' },
        { labelKey: 'footer.columns.capabilities.links.ai', path: '/servicios' },
        { labelKey: 'footer.columns.capabilities.links.ux', path: '/servicios' },
      ],
    },
  ] as const;
}
