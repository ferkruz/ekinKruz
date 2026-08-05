import { Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { Container } from '../../shared/ui/container/container';

@Component({
  selector: 'ek-methodology-section',
  standalone: true,
  imports: [Container, TranslocoPipe],
  templateUrl: './methodology-section.html',
  styleUrl: './methodology-section.css',
})
export class MethodologySection {
  readonly stages = [
    { index: '01', labelKey: 'methodology.stages.discovery.title' },
    { index: '02', labelKey: 'methodology.stages.strategy.title' },
    { index: '03', labelKey: 'methodology.stages.design.title' },
    { index: '04', labelKey: 'methodology.stages.engineering.title' },
    { index: '05', labelKey: 'methodology.stages.validation.title' },
    { index: '06', labelKey: 'methodology.stages.launch.title' },
    { index: '07', labelKey: 'methodology.stages.evolution.title' },
  ] as const;
}
