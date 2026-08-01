import { Component, Input } from '@angular/core';

export type CapabilityVisualKind = 'factory' | 'spatial' | 'neural' | 'ux';

@Component({
  selector: 'ek-capability-visual',
  standalone: true,
  templateUrl: './capability-visual.html',
  styleUrl: './capability-visual.css',
})
export class CapabilityVisualComponent {
  @Input({ required: true }) kind!: CapabilityVisualKind;
  @Input() active = false;
}
