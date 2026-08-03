import { Injectable } from '@angular/core';

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
  private readonly endpoint = 'https://formsubmit.co/ajax/fercruzhigel@hotmail.com';

  async requestMeeting(payload: ContactKickoffPayload): Promise<void> {
    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _captcha: 'false',
        _subject: `Nueva solicitud de reunión - ${payload.company}`,
        _template: 'table',
        nombre: payload.fullName,
        empresa: payload.company,
        email: payload.email,
        telefono: payload.phone || 'No informado',
        tipo_de_proyecto: payload.projectType,
        mensaje: payload.brief,
        origen: window.location.href,
      }),
    });

    if (!response.ok) {
      throw new Error('No se pudo enviar la solicitud de reunión.');
    }
  }
}
