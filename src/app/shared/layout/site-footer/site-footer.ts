import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Container } from '../../ui/container/container';

@Component({
  selector: 'ek-site-footer',
  standalone: true,
  imports: [RouterLink, Container],
  templateUrl: './site-footer.html',
  styleUrl: './site-footer.css',
})
export class SiteFooter {
  readonly year = new Date().getFullYear();

  readonly columns = [
    {
      title: 'Empresa',
      links: [
        { label: 'Nosotros', path: '/nosotros' },
        { label: 'Metodología', path: '/metodologia' },
        { label: 'Blog', path: '/blog' },
        { label: 'Contacto', path: '/contacto' },
      ],
    },
    {
      title: 'Capacidades',
      links: [
        { label: 'Software Factory', path: '/servicios' },
        { label: 'Experiencias 3D', path: '/servicios' },
        { label: 'Inteligencia Artificial', path: '/servicios' },
        { label: 'UX & Producto', path: '/servicios' },
      ],
    },
  ] as const;
}
