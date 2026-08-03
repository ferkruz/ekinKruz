import { Component, input } from '@angular/core';
import { MethodologyStageVisual } from '../../data/methodology-stages';

@Component({
  selector: 'ek-methodology-graph-layer',
  standalone: true,
  templateUrl: './methodology-graph-layer.html',
  styleUrl: './methodology-graph-layer.css',
})
export class MethodologyGraphLayer {
  readonly visual = input.required<MethodologyStageVisual>();
  readonly active = input(false);
}
