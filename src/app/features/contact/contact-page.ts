import { Component } from '@angular/core';
import { PlaceholderPage } from '../shared/placeholder-page';

@Component({
  selector: 'ek-contact-page',
  standalone: true,
  imports: [PlaceholderPage],
  template: `
    <ek-placeholder-page
      eyebrow="Contacto"
      title="Agendá una reunión."
      description="Formulario, LinkedIn, WhatsApp y Calendly — próxima iteración."
    />
  `,
})
export class ContactPage {}
