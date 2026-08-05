import { NgComponentOutlet } from '@angular/common';
import { afterNextRender, Component, signal } from '@angular/core';
import type { Type } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { RevealDirective } from '../../shared/motion/reveal.directive';
import { CardScene } from '../../shared/three/card-scene/card-scene';
import { Container } from '../../shared/ui/container/container';

@Component({
  selector: 'ek-about-page',
  standalone: true,
  imports: [
    Container,
    RevealDirective,
    CardScene,
    NgComponentOutlet,
    TranslocoPipe,
  ],
  templateUrl: './about-page.html',
  styleUrl: './about-page.css',
})
export class AboutPage {
  readonly principles = [
    'about.principles.noTemplates',
    'about.principles.quality',
    'about.principles.scalability',
    'about.principles.futureVision',
  ] as const;
  readonly aboutDiamondComponent = signal<Type<unknown> | null>(null);

  constructor() {
    afterNextRender(async () => {
      const { AboutDiamondComponent } = await import('./about-diamond');
      this.aboutDiamondComponent.set(AboutDiamondComponent);
    });
  }
}
