import { DOCUMENT } from '@angular/common';
import { DestroyRef, Injectable, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Meta, Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { filter, merge, startWith, switchMap } from 'rxjs';

export type LanguageCode = 'es' | 'en' | 'eu';

export interface LanguageOption {
  readonly code: LanguageCode;
  readonly labelKey: string;
  readonly hreflang: string;
}

interface SeoTranslation {
  readonly title: string;
  readonly description: string;
  readonly ogTitle: string;
  readonly ogDescription: string;
}

const STORAGE_KEY = 'ekin-kruz.lang';
const DEFAULT_LANGUAGE: LanguageCode = 'es';

export const LANGUAGE_OPTIONS: readonly LanguageOption[] = [
  { code: 'es', labelKey: 'language.options.es', hreflang: 'es' },
  { code: 'en', labelKey: 'language.options.en', hreflang: 'en' },
  { code: 'eu', labelKey: 'language.options.eu', hreflang: 'eu' },
] as const;

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly transloco = inject(TranslocoService);
  private readonly router = inject(Router);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);

  readonly languages = LANGUAGE_OPTIONS;
  readonly activeLanguage = computed(() => this.transloco.activeLang() as LanguageCode);
  readonly activeOption = computed(
    () => this.languages.find((language) => language.code === this.activeLanguage()) ?? this.languages[0],
  );

  private readonly initialized = signal(false);

  init(): void {
    if (this.initialized()) return;

    const initialLanguage = this.resolveInitialLanguage();
    this.transloco.setDefaultLang(DEFAULT_LANGUAGE);
    this.applyLanguage(initialLanguage, false);
    this.bindSeoUpdates();
    this.initialized.set(true);
  }

  setLanguage(language: LanguageCode): void {
    if (!this.isSupported(language)) return;
    this.applyLanguage(language, true);
  }

  isSupported(language: string | null | undefined): language is LanguageCode {
    return this.languages.some((option) => option.code === language);
  }

  private applyLanguage(language: LanguageCode, persist: boolean): void {
    this.transloco.setActiveLang(language);
    this.document.documentElement.lang = language;

    if (persist && this.hasBrowserStorage()) {
      window.localStorage.setItem(STORAGE_KEY, language);
    }
  }

  private resolveInitialLanguage(): LanguageCode {
    const queryLanguage = this.normalizeLanguage(this.readQueryLanguage());
    if (this.isSupported(queryLanguage)) return queryLanguage;

    const storedLanguage = this.normalizeLanguage(this.readStoredLanguage());
    if (this.isSupported(storedLanguage)) return storedLanguage;

    const browserLanguage = this.readBrowserLanguages()
      .map((language) => this.normalizeLanguage(language))
      .find((language): language is LanguageCode => this.isSupported(language));

    return browserLanguage ?? DEFAULT_LANGUAGE;
  }

  private readQueryLanguage(): string | null {
    if (typeof window === 'undefined') return null;
    return new URLSearchParams(window.location.search).get('lang');
  }

  private readStoredLanguage(): string | null {
    if (!this.hasBrowserStorage()) return null;
    return window.localStorage.getItem(STORAGE_KEY);
  }

  private readBrowserLanguages(): readonly string[] {
    if (typeof navigator === 'undefined') return [];
    return navigator.languages?.length ? navigator.languages : [navigator.language];
  }

  private normalizeLanguage(language: string | null | undefined): LanguageCode | null {
    if (!language) return null;
    const baseLanguage = language.toLowerCase().split('-')[0];
    return this.isSupported(baseLanguage) ? baseLanguage : null;
  }

  private hasBrowserStorage(): boolean {
    try {
      return typeof window !== 'undefined' && Boolean(window.localStorage);
    } catch {
      return false;
    }
  }

  private bindSeoUpdates(): void {
    merge(
      this.router.events.pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd)),
      this.transloco.langChanges$,
    )
      .pipe(
        startWith(null),
        switchMap(() =>
          this.transloco.selectTranslateObject<SeoTranslation>(`seo.${this.currentSeoKey()}`),
        ),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((seo) => this.applySeo(seo));
  }

  private currentSeoKey(): string {
    let route = this.router.routerState.snapshot.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    return route.data['seoKey'] ?? 'home';
  }

  private applySeo(seo: SeoTranslation): void {
    if (!seo?.title || !seo?.description) return;

    const locale = this.localeFor(this.activeLanguage());
    this.title.setTitle(seo.title);
    this.meta.updateTag({ name: 'description', content: seo.description });
    this.meta.updateTag({ property: 'og:title', content: seo.ogTitle });
    this.meta.updateTag({ property: 'og:description', content: seo.ogDescription });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:locale', content: locale });
    this.updateAlternateLinks();
  }

  private localeFor(language: LanguageCode): string {
    const locales: Record<LanguageCode, string> = {
      es: 'es_ES',
      en: 'en_GB',
      eu: 'eu_ES',
    };

    return locales[language];
  }

  private updateAlternateLinks(): void {
    if (typeof window === 'undefined') return;

    const path = window.location.pathname || '/';
    const head = this.document.head;
    const origin = window.location.origin;

    for (const language of this.languages) {
      this.upsertAlternateLink(
        head,
        language.hreflang,
        `${origin}${path}?lang=${language.code}`,
      );
    }

    this.upsertAlternateLink(head, 'x-default', `${origin}${path}?lang=${DEFAULT_LANGUAGE}`);
  }

  private upsertAlternateLink(head: HTMLHeadElement, hreflang: string, href: string): void {
    const selector = `link[rel="alternate"][hreflang="${hreflang}"]`;
    const existing = head.querySelector<HTMLLinkElement>(selector);
    const link = existing ?? this.document.createElement('link');

    link.rel = 'alternate';
    link.hreflang = hreflang;
    link.href = href;

    if (!existing) {
      head.appendChild(link);
    }
  }
}
