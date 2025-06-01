import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of } from "rxjs";
import { environment } from "../../../../environment/environment";
import { Messages } from "../../../shared/constant/messages";

@Injectable({
    providedIn: 'root'
})
export class WeatherService {
    constructor(
        private httpClientService: HttpClient
    ) {}

    getWeather(city: string): Observable<any> {
        /*
            Call the weather API and get its 
            output
        */
        const url = `${environment.weather.url}?q=${city}&appid=${environment.weather.key}&units=metric`;
        return this.httpClientService.get(url).pipe(
        catchError(error => {
            /*
                Provide error catching 
                for easy determination
            */
            if (error.status === 404) {
                return of({ error: Messages.errors.cityNotFound });
            } else if (error.status === 401) {
                return of({ error: Messages.errors.invalidApiKey });
            } else if (error.status === 0) {
                return of({ error: Messages.errors.networkError });
            } else {
                return of({ error: Messages.errors.unexpected });
            }
        })
    );
  }
}