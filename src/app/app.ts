import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { SiteHeader } from './shared/layout/site-header/site-header';
import { SiteFooter } from './shared/layout/site-footer/site-footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SiteHeader, SiteFooter, TranslocoPipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
