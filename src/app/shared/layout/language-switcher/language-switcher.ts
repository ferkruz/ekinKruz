import {
  Component,
  ElementRef,
  HostListener,
  computed,
  inject,
  signal,
} from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import {
  LANGUAGE_OPTIONS,
  LanguageCode,
  LanguageService,
} from '../../../core/i18n/language.service';

@Component({
  selector: 'ek-language-switcher',
  standalone: true,
  imports: [TranslocoPipe],
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.css',
})
export class LanguageSwitcherComponent {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly languageService = inject(LanguageService);

  readonly open = signal(false);
  readonly focusedIndex = signal(0);
  readonly languages = LANGUAGE_OPTIONS;
  readonly activeLanguage = this.languageService.activeLanguage;
  readonly activeOption = this.languageService.activeOption;
  readonly menuId = `ek-language-menu-${Math.random().toString(36).slice(2)}`;
  readonly activeLabelKey = computed(() => this.activeOption().labelKey);

  @HostListener('document:pointerdown', ['$event'])
  onDocumentPointerDown(event: PointerEvent): void {
    if (!this.host.nativeElement.contains(event.target as Node)) {
      this.close();
    }
  }

  toggle(): void {
    this.open() ? this.close() : this.openMenu();
  }

  openMenu(): void {
    this.open.set(true);
    const activeIndex = this.languages.findIndex((language) => language.code === this.activeLanguage());
    this.focusedIndex.set(Math.max(activeIndex, 0));
    this.focusOption();
  }

  close(): void {
    this.open.set(false);
  }

  selectLanguage(language: LanguageCode): void {
    this.languageService.setLanguage(language);
    this.close();
    this.focusTrigger();
  }

  onTriggerKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.openMenu();
    }
  }

  onMenuKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.close();
      this.focusTrigger();
      return;
    }

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const direction = event.key === 'ArrowDown' ? 1 : -1;
      const nextIndex = (this.focusedIndex() + direction + this.languages.length) % this.languages.length;
      this.focusedIndex.set(nextIndex);
      this.focusOption();
      return;
    }

    if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      this.focusedIndex.set(event.key === 'Home' ? 0 : this.languages.length - 1);
      this.focusOption();
    }
  }

  private focusOption(): void {
    requestAnimationFrame(() => {
      const option = this.host.nativeElement.querySelector(
        `[data-language-index="${this.focusedIndex()}"]`,
      ) as HTMLElement | null;
      option?.focus();
    });
  }

  private focusTrigger(): void {
    requestAnimationFrame(() => {
      const trigger = this.host.nativeElement.querySelector(
        '.ek-language__trigger',
      ) as HTMLButtonElement | null;
      trigger?.focus();
    });
  }
}
