import { NgComponentOutlet } from '@angular/common';
import { afterNextRender, Component, signal } from '@angular/core';
import type { Type } from '@angular/core';
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
  ],
  templateUrl: './about-page.html',
  styleUrl: './about-page.css',
})
export class AboutPage {
  readonly principles = ['Sin plantillas', 'Calidad', 'Escalabilidad', 'Visión de futuro'];
  readonly aboutDiamondComponent = signal<Type<unknown> | null>(null);

  constructor() {
    afterNextRender(async () => {
      const { AboutDiamondComponent } = await import('./about-diamond');
      this.aboutDiamondComponent.set(AboutDiamondComponent);
    });
  }
}
