import { Injectable, inject } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';

export interface ContactKickoffPayload {
  readonly fullName: string;
  readonly company: string;
  readonly email: string;
  readonly phone: string;
  readonly projectType: string;
  readonly brief: string;
}

@Injectable({ providedIn: 'root' })
export class ContactKickoffService {
  private readonly transloco = inject(TranslocoService);
  private readonly endpoint = 'https://formsubmit.co/ajax/fercruzhigel@hotmail.com';

  async requestMeeting(payload: ContactKickoffPayload): Promise<void> {
    const subject = this.transloco.translate('contact.email.subject', { company: payload.company });
    const phoneFallback = this.transloco.translate('contact.email.phoneFallback');

    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _captcha: 'false',
        _subject: subject,
        _template: 'table',
        nombre: payload.fullName,
        empresa: payload.company,
        email: payload.email,
        telefono: payload.phone || phoneFallback,
        tipo_de_proyecto: payload.projectType,
        mensaje: payload.brief,
        origen: window.location.href,
      }),
    });

    if (!response.ok) {
      throw new Error(this.transloco.translate('contact.email.error'));
    }
  }
}
