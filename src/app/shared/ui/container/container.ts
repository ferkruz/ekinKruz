import { Component, Input } from '@angular/core';

@Component({
  selector: 'ek-container',
  standalone: true,
  templateUrl: './container.html',
  styleUrl: './container.css',
})
export class Container {
  @Input() wide = false;
}
