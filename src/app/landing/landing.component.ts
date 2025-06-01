import { Component, OnInit } from '@angular/core';
import { Messages } from '../shared/constant/messages';
import { AuthService } from '../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { environment } from '../../environment/environment';

@Component({
  selector: 'app-landing',
  standalone: true,
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent implements OnInit {
  welcomeMessage = Messages.welcomeMessage;

  constructor(
    private authService: AuthService,
    private routerService: Router
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.routerService.navigate([environment.pageLinks.home]);
      }
    });
  }

  async onGitSignIn() {
    this.authService.signInWithGitHub();
  }
}
