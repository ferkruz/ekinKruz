import { Component, HostListener, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher';

@Component({
  selector: 'ek-site-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TranslocoPipe, LanguageSwitcherComponent],
  templateUrl: './site-header.html',
  styleUrl: './site-header.css',
})
export class SiteHeader {
  readonly scrolled = signal(false);
  readonly menuOpen = signal(false);

  readonly navItems = [
    { labelKey: 'nav.services', path: '/servicios' },
    { labelKey: 'nav.portfolio', path: '/portfolio' },
    { labelKey: 'nav.methodology', path: '/metodologia' },
    { labelKey: 'nav.about', path: '/nosotros' },
    { labelKey: 'nav.blog', path: '/blog' },
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
