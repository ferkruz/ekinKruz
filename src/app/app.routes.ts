import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home-page').then((m) => m.HomePage),
    data: { seoKey: 'home' },
  },
  {
    path: 'servicios',
    loadComponent: () => import('./features/services/services-page').then((m) => m.ServicesPage),
    data: { seoKey: 'services' },
  },
  {
    path: 'portfolio',
    loadComponent: () => import('./features/portfolio/portfolio-page').then((m) => m.PortfolioPage),
    data: { seoKey: 'portfolio' },
  },
  {
    path: 'metodologia',
    loadComponent: () =>
      import('./features/methodology/methodology-page').then((m) => m.MethodologyPage),
    data: { seoKey: 'methodology' },
  },
  {
    path: 'nosotros',
    loadComponent: () => import('./features/about/about-page').then((m) => m.AboutPage),
    data: { seoKey: 'about' },
  },
  {
    path: 'blog',
    loadComponent: () => import('./features/blog/blog-page').then((m) => m.BlogPage),
    data: { seoKey: 'blog' },
  },
  {
    path: 'blog/:slug',
    loadComponent: () => import('./features/blog/blog-page').then((m) => m.BlogPage),
    data: { seoKey: 'blog' },
  },
  {
    path: 'contacto',
    loadComponent: () => import('./features/contact/contact-page').then((m) => m.ContactPage),
    data: { seoKey: 'contact' },
  },
  { path: '**', redirectTo: '' },
];
