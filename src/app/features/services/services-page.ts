import { Component } from '@angular/core';
import { Container } from '../../shared/ui/container/container';
import { SectionHeader } from '../../shared/ui/section-header/section-header';
import { RevealDirective } from '../../shared/motion/reveal.directive';
import { SignalTiltDirective } from '../../shared/motion/signal-tilt.directive';
import { CardScene } from '../../shared/three/card-scene/card-scene';
import { CAPABILITIES } from './data/capabilities';
import { CapabilityCard } from './components/capability-card/capability-card';
import { ComingSoonCard } from './components/coming-soon-card/coming-soon-card';

@Component({
  selector: 'ek-services-page',
  standalone: true,
  imports: [
    Container,
    SectionHeader,
    RevealDirective,
    SignalTiltDirective,
    CardScene,
    CapabilityCard,
    ComingSoonCard,
  ],
  templateUrl: './services-page.html',
  styleUrl: './services-page.css',
})
export class ServicesPage {
  readonly capabilities = CAPABILITIES;
}
