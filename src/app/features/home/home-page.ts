import { Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { Button } from '../../shared/ui/button/button';
import { Container } from '../../shared/ui/container/container';
import { SectionHeader } from '../../shared/ui/section-header/section-header';
import { HeroScene } from '../../shared/three/hero-scene/hero-scene';
import { CardScene } from '../../shared/three/card-scene/card-scene';
import { SignalTiltDirective } from '../../shared/motion/signal-tilt.directive';
import { MethodologySection } from './methodology-section';

@Component({
  selector: 'ek-home-page',
  standalone: true,
  imports: [
    Button,
    Container,
    SectionHeader,
    HeroScene,
    CardScene,
    SignalTiltDirective,
    MethodologySection,
    TranslocoPipe,
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {
  readonly services = [
    {
      id: 'software-factory',
      eyebrow: '01',
      titleKey: 'home.capabilities.cards.softwareFactory.title',
      descriptionKey: 'home.capabilities.cards.softwareFactory.description',
      accent: 'signal' as const,
    },
    {
      id: 'spatial-experiences',
      eyebrow: '02',
      titleKey: 'home.capabilities.cards.spatial.title',
      descriptionKey: 'home.capabilities.cards.spatial.description',
      accent: 'trust' as const,
    },
    {
      id: 'artificial-intelligence',
      eyebrow: '03',
      titleKey: 'home.capabilities.cards.ai.title',
      descriptionKey: 'home.capabilities.cards.ai.description',
      accent: 'signal' as const,
    },
    {
      id: 'ux-product',
      eyebrow: '04',
      titleKey: 'home.capabilities.cards.ux.title',
      descriptionKey: 'home.capabilities.cards.ux.description',
      accent: 'trust' as const,
    },
  ] as const;

  readonly cases = [
    {
      id: 'smart-city',
      titleKey: 'home.portfolio.cases.smartCity.title',
      tagKey: 'home.portfolio.cases.smartCity.tag',
      summaryKey: 'home.portfolio.cases.smartCity.summary',
      accent: 'trust' as const,
    },
    {
      id: 'industrial-explorer',
      titleKey: 'home.portfolio.cases.industrial.title',
      tagKey: 'home.portfolio.cases.industrial.tag',
      summaryKey: 'home.portfolio.cases.industrial.summary',
      accent: 'signal' as const,
    },
    {
      id: 'real-estate-configurator',
      titleKey: 'home.portfolio.cases.realEstate.title',
      tagKey: 'home.portfolio.cases.realEstate.tag',
      summaryKey: 'home.portfolio.cases.realEstate.summary',
      accent: 'trust' as const,
    },
  ] as const;
}
