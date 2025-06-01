import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { map, Observable, take } from "rxjs";
import { AuthService } from "../services/auth/auth.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private routerService: Router
    ) {}

    canActivate(): Observable<boolean | UrlTree> {
        return this.authService.user$.pipe(
            map(user => user ? true : this.routerService.createUrlTree(['/']))
        );
    }
}