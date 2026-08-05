import { Component, DestroyRef, ElementRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { ContactKickoffService } from './contact-kickoff.service';

type ContactControlName =
  | 'fullName'
  | 'company'
  | 'email'
  | 'phone'
  | 'projectType'
  | 'brief';

@Component({
  selector: 'ek-contact-kickoff-form',
  standalone: true,
  imports: [ReactiveFormsModule, TranslocoPipe],
  templateUrl: './contact-kickoff-form.html',
  styleUrl: './contact-kickoff-form.css',
})
export class ContactKickoffFormComponent {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);
  private readonly service = inject(ContactKickoffService);
  private readonly transloco = inject(TranslocoService);

  readonly submitting = signal(false);
  readonly submitted = signal(false);
  readonly briefLength = signal(0);
  readonly submitErrorKey = signal('');

  readonly projectOptions = [
    'customSoftware',
    'spatialExperience',
    'artificialIntelligence',
    'uxProduct',
    'technologyIntegration',
    'notDefined',
  ] as const;

  readonly form = new FormGroup({
    fullName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
    }),
    company: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    phone: new FormControl('', { nonNullable: true }),
    projectType: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    brief: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(20), Validators.maxLength(500)],
    }),
  });

  constructor() {
    this.form.controls.brief.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => this.briefLength.set(value.length));
  }

  fieldInvalid(controlName: ContactControlName): boolean {
    const control = this.form.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  fieldComplete(controlName: ContactControlName): boolean {
    const control = this.form.controls[controlName];
    return control.valid && Boolean(control.value.trim()) && (control.dirty || control.touched);
  }

  hasError(controlName: ContactControlName, error: string): boolean {
    const control = this.form.controls[controlName];
    return control.hasError(error) && (control.dirty || control.touched);
  }

  async submit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    this.submitErrorKey.set('');

    try {
      const payload = this.form.getRawValue();

      await this.service.requestMeeting({
        ...payload,
        projectType: this.transloco.translate(`contact.form.projectOptions.${payload.projectType}`),
      });
      await this.revealSuccess();
    } catch {
      this.submitErrorKey.set('contact.form.errors.submit');
    } finally {
      this.submitting.set(false);
    }
  }

  private async revealSuccess(): Promise<void> {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const form = this.host.nativeElement.querySelector('.ek-contact-form__form');

    if (!prefersReducedMotion && form) {
      const { gsap } = await import('gsap');
      await gsap.to(form, {
        autoAlpha: 0,
        y: 16,
        filter: 'blur(8px)',
        duration: 0.42,
        ease: 'power3.out',
      });

      this.submitted.set(true);
      await new Promise((resolve) => requestAnimationFrame(resolve));

      const success = this.host.nativeElement.querySelector('.ek-contact-form__success');
      if (success) {
        gsap.fromTo(
          success,
          { autoAlpha: 0, y: 18, filter: 'blur(10px)' },
          { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.62, ease: 'power3.out' },
        );
      }
      return;
    }

    this.submitted.set(true);
  }
}
