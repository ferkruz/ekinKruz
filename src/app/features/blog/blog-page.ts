import { Component, computed, effect, inject, signal } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslocoPipe } from '@jsverse/transloco';
import { Container } from '../../shared/ui/container/container';
import { SectionHeader } from '../../shared/ui/section-header/section-header';
import { RevealDirective } from '../../shared/motion/reveal.directive';
import { SignalTiltDirective } from '../../shared/motion/signal-tilt.directive';
import { LanguageCode, LanguageService } from '../../core/i18n/language.service';
import { BLOG_POSTS, findBlogPost } from './data/blog-posts';

interface BlogUiCopy {
  readonly label: string;
  readonly readArticle: string;
  readonly backToBlog: string;
  readonly notFoundTitle: string;
  readonly notFoundDescription: string;
  readonly contactLabel: string;
}

const BLOG_UI: Record<LanguageCode, BlogUiCopy> = {
  es: {
    label: 'Artículos publicados',
    readArticle: 'Leer artículo',
    backToBlog: 'Volver al blog',
    notFoundTitle: 'Artículo no encontrado.',
    notFoundDescription: 'El post que buscás no existe o cambió de dirección.',
    contactLabel: 'Ir a contacto',
  },
  en: {
    label: 'Published articles',
    readArticle: 'Read article',
    backToBlog: 'Back to blog',
    notFoundTitle: 'Article not found.',
    notFoundDescription: 'The post you are looking for does not exist or has moved.',
    contactLabel: 'Go to contact',
  },
  eu: {
    label: 'Argitaratutako artikuluak',
    readArticle: 'Artikulua irakurri',
    backToBlog: 'Blogera itzuli',
    notFoundTitle: 'Artikulua ez da aurkitu.',
    notFoundDescription: 'Bilatzen ari zaren posta ez da existitzen edo helbidez aldatu da.',
    contactLabel: 'Kontaktura joan',
  },
};

@Component({
  selector: 'ek-blog-page',
  standalone: true,
  imports: [
    Container,
    SectionHeader,
    RouterLink,
    RevealDirective,
    SignalTiltDirective,
    TranslocoPipe,
  ],
  templateUrl: './blog-page.html',
  styleUrl: './blog-page.css',
})
export class BlogPage {
  private readonly route = inject(ActivatedRoute);
  private readonly language = inject(LanguageService);

  private readonly activeSlug = signal<string | null>(null);

  readonly ui = computed(() => BLOG_UI[this.language.activeLanguage()]);
  readonly posts = computed(() =>
    BLOG_POSTS.map((post) => ({
      post,
      content: post.translations[this.language.activeLanguage()],
    })),
  );
  readonly activePost = computed(() => findBlogPost(this.activeSlug()));
  readonly activePostView = computed(() => {
    const post = this.activePost();
    if (!post) return null;

    return {
      post,
      content: post.translations[this.language.activeLanguage()],
      imageAlt: post.imageAlt[this.language.activeLanguage()],
    };
  });
  readonly hasMissingPost = computed(() => Boolean(this.activeSlug()) && !this.activePost());

  constructor() {
    this.route.paramMap.pipe(takeUntilDestroyed()).subscribe((params) => {
      this.activeSlug.set(params.get('slug'));
    });

    effect(() => {
      const view = this.activePostView();

      this.language.setSeoOverride(
        view
          ? {
              title: view.content.seoTitle,
              description: view.content.metaDescription,
              ogTitle: view.content.seoTitle,
              ogDescription: view.content.metaDescription,
            }
          : null,
      );
    });
  }
}
