import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { JobSearchComponent } from './features/jobs/job-search/job-search.component';
import { FavoritesPageComponent } from './features/favorites/favorites-page/favorites-page.component';
import { ApplicationsPageComponent } from './features/applications/applications-page/applications-page.component';
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
    component: FavoritesPageComponent,
    canActivate: [authGuard]
  },
  {
    path: 'applications',
    component: ApplicationsPageComponent,
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
