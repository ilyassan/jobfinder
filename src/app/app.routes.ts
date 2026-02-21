import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { JobSearchComponent } from './features/jobs/job-search/job-search.component';
import { ApplicationsPageComponent } from './features/applications/applications-page/applications-page.component';
import { ProfileComponent } from './features/auth/profile/profile.component';
import { guestGuard } from './core/guards/guest.guard';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: JobSearchComponent
  },
  {
    path: 'jobs',
    component: JobSearchComponent
  },
  {
    path: 'favorites',
    loadComponent: () =>
      import('./features/favorites/favorites-page/favorites-page.component')
        .then(m => m.FavoritesPageComponent),
    canActivate: [authGuard]
  },
  {
    path: 'applications',
    component: ApplicationsPageComponent,
    canActivate: [authGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [guestGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [guestGuard]
  }
];
