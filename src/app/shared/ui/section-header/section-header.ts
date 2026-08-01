import { Component, Input } from '@angular/core';

@Component({
  selector: 'ek-section-header',
  standalone: true,
  templateUrl: './section-header.html',
  styleUrl: './section-header.css',
})
export class SectionHeader {
  @Input({ required: true }) eyebrow!: string;
  @Input({ required: true }) title!: string;
  @Input() description: string | null = null;
  @Input() align: 'left' | 'center' = 'left';
}
