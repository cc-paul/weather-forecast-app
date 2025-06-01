import { Component, OnInit, signal } from '@angular/core';
import { AuthService } from '../core/services/auth/auth.service';
import { environment } from '../../environment/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [
    CommonModule
  ],
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  fullName: string = '';
  gitProfile: string = '';
  showWeatherTable: boolean = false;

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      const userData = user?.user_metadata;
      const userName = userData?.["user_name"];
      this.fullName = userData?.["full_name"];
      this.gitProfile = `${environment.githubBaseUrl}${userName}`;
    });
  }

  toggleWeatherTable(showIt: boolean) {
    this.showWeatherTable = showIt;
  }
}