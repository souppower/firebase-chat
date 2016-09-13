import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';


export const APP_ROUTES: Routes = [
    { path: '',component: ProfileComponent, pathMatch: 'full' },
    { path: '**', redirectTo: '/' }
];
