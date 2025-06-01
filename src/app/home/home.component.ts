import { Component, OnInit, signal } from '@angular/core';
import { AuthService } from '../core/services/auth/auth.service';
import { environment } from '../../environment/environment';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../core/services/weatherservice/weather.service';
import { FormsModule } from '@angular/forms';
import { Messages } from '../shared/constant/messages';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  fullName: string = '';
  gitProfile: string = '';
  city: string = '';
  errorMessage: string = '';
  showWeatherTable: boolean = false;
  weather: any;

  constructor(
    private authService: AuthService,
    private weatherService: WeatherService
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

  fetchWeather() {
    this.errorMessage = '';
    this.weather = null;

    if (this.city === '') {
      this.errorMessage = Messages.errors.nothing;
    } else {
      this.weatherService.getWeather(this.city).subscribe(data => {
        if (data.error) {
          this.errorMessage = data.error;
          this.weather = null;
        } else {
          this.weather = data;
          this.city = '';
          this.toggleWeatherTable(true);
        }
      });
    }
  }
}