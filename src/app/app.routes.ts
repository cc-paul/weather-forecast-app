import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./landing/landing.component').then(m => m.LandingComponent)
    },
    {
        path: 'home',
        loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
        canActivate: [AuthGuard]
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }