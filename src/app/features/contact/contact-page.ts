import { NgComponentOutlet } from '@angular/common';
import { afterNextRender, Component, ElementRef, OnDestroy, inject, signal } from '@angular/core';
import type { Type } from '@angular/core';
import { RevealDirective } from '../../shared/motion/reveal.directive';
import { Container } from '../../shared/ui/container/container';
import { ContactKickoffFormComponent } from './contact-kickoff-form';
import { setupContactPageMotion, type ContactPageMotionCleanup } from './contact-page.animator';

@Component({
  selector: 'ek-contact-page',
  standalone: true,
  imports: [
    Container,
    RevealDirective,
    NgComponentOutlet,
    ContactKickoffFormComponent,
  ],
  templateUrl: './contact-page.html',
  styleUrl: './contact-page.css',
})
export class ContactPage implements OnDestroy {
  private readonly host = inject(ElementRef<HTMLElement>);

  readonly mapComponent = signal<Type<unknown> | null>(null);
  readonly infoItems = [
    {
      title: 'Tiempo de respuesta',
      description: 'Respondemos en menos de 24 horas hábiles.',
    },
    {
      title: 'Modalidad',
      description: 'Trabajamos de forma remota con clientes de diferentes países.',
    },
    {
      title: 'Tecnologías',
      description: 'Software a medida • 3D • IA • UX',
    },
  ] as const;

  private motionCleanup: ContactPageMotionCleanup | null = null;

  constructor() {
    afterNextRender(async () => {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      this.motionCleanup = await setupContactPageMotion(this.host.nativeElement, reducedMotion);

      const { ContactMapComponent } = await import('./contact-map');
      this.mapComponent.set(ContactMapComponent);
    });
  }

  ngOnDestroy(): void {
    this.motionCleanup?.();
    this.motionCleanup = null;
  }
}
