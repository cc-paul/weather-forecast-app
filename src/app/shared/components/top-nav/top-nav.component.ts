import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-top-nav',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './top-nav.component.html',
  styleUrl: './top-nav.component.css'
})
export class TopNavComponent {
  hideSignOutButton$!: Observable<boolean>;

  constructor(private authService: AuthService) {
    this.hideSignOutButton$ = this.authService.hideSignOutButton$;
  }

  async onSignOut() {
    this.authService.signOut();
  }
}
