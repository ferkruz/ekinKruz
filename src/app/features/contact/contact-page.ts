import { NgComponentOutlet } from '@angular/common';
import { afterNextRender, Component, ElementRef, OnDestroy, inject, signal } from '@angular/core';
import type { Type } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
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
    TranslocoPipe,
  ],
  templateUrl: './contact-page.html',
  styleUrl: './contact-page.css',
})
export class ContactPage implements OnDestroy {
  private readonly host = inject(ElementRef<HTMLElement>);

  readonly mapComponent = signal<Type<unknown> | null>(null);
  readonly infoItems = [
    {
      titleKey: 'contact.info.response.title',
      descriptionKey: 'contact.info.response.description',
    },
    {
      titleKey: 'contact.info.modality.title',
      descriptionKey: 'contact.info.modality.description',
    },
    {
      titleKey: 'contact.info.technologies.title',
      descriptionKey: 'contact.info.technologies.description',
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
