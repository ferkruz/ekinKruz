import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

export type EkButtonVariant = 'primary' | 'ghost' | 'text';
export type EkButtonSize = 'md' | 'lg';

@Component({
  selector: 'ek-button',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  @Input() variant: EkButtonVariant = 'primary';
  @Input() size: EkButtonSize = 'md';
  @Input() href: string | null = null;
  @Input() routerLink: string | null = null;
  @Input() type: 'button' | 'submit' = 'button';
  @Input() disabled = false;
  @Input() ariaLabel: string | null = null;
}
