import { Component, input } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { MethodologyStageVisual as StageVisual } from '../../data/methodology-stages';

@Component({
  selector: 'ek-methodology-stage-visual',
  standalone: true,
  imports: [TranslocoPipe],
  templateUrl: './methodology-stage-visual.html',
  styleUrl: './methodology-stage-visual.css',
})
export class MethodologyStageVisual {
  readonly visual = input.required<StageVisual>();
  readonly active = input(false);
  readonly neuralTerms = [
    'methodology.visual.terms.brief',
    'methodology.visual.terms.user',
    'methodology.visual.terms.data',
    'methodology.visual.terms.risk',
    'methodology.visual.terms.opportunity',
  ] as const;
}
