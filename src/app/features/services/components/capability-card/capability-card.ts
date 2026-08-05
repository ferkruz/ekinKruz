import { Component, Input, signal } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { Capability } from '../../data/capabilities';
import { CapabilityVisualComponent } from '../../../../shared/ui/capability-visual/capability-visual';
import { SignalTiltDirective } from '../../../../shared/motion/signal-tilt.directive';
import { RevealDirective } from '../../../../shared/motion/reveal.directive';

@Component({
  selector: 'ek-capability-card',
  standalone: true,
  imports: [CapabilityVisualComponent, SignalTiltDirective, RevealDirective, TranslocoPipe],
  templateUrl: './capability-card.html',
  styleUrl: './capability-card.css',
})
export class CapabilityCard {
  @Input({ required: true }) capability!: Capability;
  @Input() revealDelay = 0;

  readonly active = signal(false);

  onActivate(): void {
    this.active.set(true);
  }

  onDeactivate(): void {
    this.active.set(false);
  }
}
