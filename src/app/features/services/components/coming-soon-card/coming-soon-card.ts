import { Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { RevealDirective } from '../../../../shared/motion/reveal.directive';
import { SignalTiltDirective } from '../../../../shared/motion/signal-tilt.directive';
import { Button } from '../../../../shared/ui/button/button';
import { CardScene } from '../../../../shared/three/card-scene/card-scene';

@Component({
  selector: 'ek-coming-soon-card',
  standalone: true,
  imports: [RevealDirective, Button, CardScene, TranslocoPipe],
  hostDirectives: [SignalTiltDirective],
  templateUrl: './coming-soon-card.html',
  styleUrl: './coming-soon-card.css',
})
export class ComingSoonCard {}
