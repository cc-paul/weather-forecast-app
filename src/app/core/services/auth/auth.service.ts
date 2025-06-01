import { Injectable, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { createClient, SupabaseClient, User } from '@supabase/supabase-js'
import { environment } from "../../../../environment/environment";
import { BehaviorSubject } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private supabase!: SupabaseClient;
    private hideSignOutButtonSubject = new BehaviorSubject<boolean>(true);
    private userSubject = new BehaviorSubject<User | null>(null);

    hideSignOutButton$ = this.hideSignOutButtonSubject.asObservable();
    user$ = this.userSubject.asObservable();

    constructor(
        private routerService: Router
    ) {
        this.supabase = createClient(
            environment.supabase.url,
            environment.supabase.key
        );

        this.restoreUser();
    }

    async initAuthListener() {
        this.supabase.auth.onAuthStateChange((event,session) => {
            /*
                Check if the user proceed with the signin 
                and if that happen get the user details 
                and go to home page
            */
            console.log(event);
            if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
                this.hideShowLogoutButton(false);
                this.userSubject.next(session?.user ?? null);
                this.routerService.navigate([environment.pageLinks.home]);
            }
        });
    }

    async signInWithGitHub() {
        /*
            If the user signed in using github 
            redirect to home page
        */
        await this.supabase.auth.signInWithOAuth({
            provider: 'github'
        });
    }

    async signOut() {
        //Sign out to github
        await this.supabase.auth.signOut();

        this.userSubject.next(null);
        this.hideShowLogoutButton(true);
        this.routerService.navigate(['/']);
    }

    hideShowLogoutButton(hideShowLogoutButton: boolean) {
        this.hideSignOutButtonSubject.next(hideShowLogoutButton);
    }

    private async restoreUser() {
        const { data: { user } } = await this.supabase.auth.getUser();

        this.hideShowLogoutButton(user === null);
        this.userSubject.next(user ?? null);
    }
}