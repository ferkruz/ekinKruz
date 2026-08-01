import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home-page').then((m) => m.HomePage),
    title: 'EKIN KRUZ — Software Factory Premium',
  },
  {
    path: 'servicios',
    loadComponent: () => import('./features/services/services-page').then((m) => m.ServicesPage),
    title: 'Servicios — EKIN KRUZ',
  },
  {
    path: 'portfolio',
    loadComponent: () => import('./features/portfolio/portfolio-page').then((m) => m.PortfolioPage),
    title: 'Portfolio — EKIN KRUZ',
  },
  {
    path: 'metodologia',
    loadComponent: () =>
      import('./features/methodology/methodology-page').then((m) => m.MethodologyPage),
    title: 'Metodología — EKIN KRUZ',
  },
  {
    path: 'nosotros',
    loadComponent: () => import('./features/about/about-page').then((m) => m.AboutPage),
    title: 'Nosotros — EKIN KRUZ',
  },
  {
    path: 'blog',
    loadComponent: () => import('./features/blog/blog-page').then((m) => m.BlogPage),
    title: 'Blog — EKIN KRUZ',
  },
  {
    path: 'contacto',
    loadComponent: () => import('./features/contact/contact-page').then((m) => m.ContactPage),
    title: 'Contacto — EKIN KRUZ',
  },
  { path: '**', redirectTo: '' },
];
