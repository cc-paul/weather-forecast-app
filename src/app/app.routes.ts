import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./landing/landing.component').then(m => m.LandingComponent)
    },
    {
        path: 'home',
        loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
    }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }