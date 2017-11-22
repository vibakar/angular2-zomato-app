import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { SearchRestaurantsComponent } from './components/search-restaurants/search-restaurants.component';
import { FavouriteRestaurantsComponent } from './components/favourite-restaurants/favourite-restaurants.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/login/forgot-password.component';
import { ProfileComponent } from './components/profile/profile.component';

import { AuthGuardService } from './auth/auth-guard.service';

const routes: Routes = [
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'home',
    component: SearchRestaurantsComponent
  },
  {
    path:'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'favourites',
    component: FavouriteRestaurantsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'reset',
    component: ForgotPasswordComponent
  },
  {
    path:'**',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule {}
