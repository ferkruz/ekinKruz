import { Component } from '@angular/core';
import { Button } from '../../shared/ui/button/button';
import { Container } from '../../shared/ui/container/container';
import { SectionHeader } from '../../shared/ui/section-header/section-header';
import { HeroScene } from '../../shared/three/hero-scene/hero-scene';
import { CardScene } from '../../shared/three/card-scene/card-scene';
import { SignalTiltDirective } from '../../shared/motion/signal-tilt.directive';

@Component({
  selector: 'ek-home-page',
  standalone: true,
  imports: [Button, Container, SectionHeader, HeroScene, CardScene, SignalTiltDirective],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {
  readonly services = [
    {
      eyebrow: '01',
      title: 'Software Factory',
      description:
        'Plataformas empresariales, APIs e integraciones construidas para escalar con arquitectura limpia.',
      accent: 'signal' as const,
    },
    {
      eyebrow: '02',
      title: 'Experiencias 3D',
      description:
        'Configuradores, gemelos digitales e infografías interactivas para industria, ciudades y producto.',
      accent: 'trust' as const,
    },
    {
      eyebrow: '03',
      title: 'Inteligencia Artificial',
      description:
        'Asistentes, automatización e integración con LLMs aplicados a flujos reales de negocio.',
      accent: 'signal' as const,
    },
    {
      eyebrow: '04',
      title: 'UX & Producto',
      description:
        'Research, diseño accesible y arquitectura frontend que convierte complejidad en claridad.',
      accent: 'trust' as const,
    },
  ] as const;

  readonly cases = [
    {
      title: 'Smart City',
      tag: '3D · Datos · Gobierno',
      summary: 'Visualización urbana interactiva para decisión operativa en tiempo real.',
      accent: 'trust' as const,
    },
    {
      title: 'Industrial Explorer',
      tag: 'Industria 4.0 · Gemelo digital',
      summary: 'Exploración de planta con capas de telemetría y contexto operativo.',
      accent: 'signal' as const,
    },
    {
      title: 'Real Estate Configurator',
      tag: 'WebGL · Inmobiliaria',
      summary: 'Configurador premium de tipologías con recorrido inmersivo y lead capture.',
      accent: 'trust' as const,
    },
  ] as const;
}
