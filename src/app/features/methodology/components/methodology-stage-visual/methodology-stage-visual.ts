import { Component, input } from '@angular/core';
import { MethodologyStageVisual as StageVisual } from '../../data/methodology-stages';

@Component({
  selector: 'ek-methodology-stage-visual',
  standalone: true,
  templateUrl: './methodology-stage-visual.html',
  styleUrl: './methodology-stage-visual.css',
})
export class MethodologyStageVisual {
  readonly visual = input.required<StageVisual>();
  readonly active = input(false);
}
