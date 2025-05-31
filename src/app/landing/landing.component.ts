import { Component } from '@angular/core';
import { Messages } from '../shared/constant/messages';

@Component({
  selector: 'app-landing',
  standalone: true,
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  welcomeMessage = Messages.welcomeMessage;
}
