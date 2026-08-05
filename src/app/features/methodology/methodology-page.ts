import { Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { Container } from '../../shared/ui/container/container';
import { RevealDirective } from '../../shared/motion/reveal.directive';
import { MethodologyExperience } from './components/methodology-experience/methodology-experience';
import { METHODOLOGY_STAGES } from './data/methodology-stages';

@Component({
  selector: 'ek-methodology-page',
  standalone: true,
  imports: [Container, RevealDirective, MethodologyExperience, TranslocoPipe],
  templateUrl: './methodology-page.html',
  styleUrl: './methodology-page.css',
})
export class MethodologyPage {
  readonly stages = METHODOLOGY_STAGES;
}
