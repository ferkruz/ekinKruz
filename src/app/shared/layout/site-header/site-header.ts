import { Component, HostListener, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'ek-site-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './site-header.html',
  styleUrl: './site-header.css',
})
export class SiteHeader {
  readonly scrolled = signal(false);
  readonly menuOpen = signal(false);

  readonly navItems = [
    { label: 'Servicios', path: '/servicios' },
    { label: 'Portfolio', path: '/portfolio' },
    { label: 'Metodología', path: '/metodologia' },
    { label: 'Nosotros', path: '/nosotros' },
    { label: 'Blog', path: '/blog' },
  ] as const;

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 12);
  }

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
