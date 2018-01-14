import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { MatDialogModule,MatButtonModule,MatProgressSpinnerModule } from '@angular/material';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SearchRestaurantsComponent } from './components/search-restaurants/search-restaurants.component';
import { DisplayRestaurantsComponent } from './components/search-restaurants/display-restaurants/display-restaurants.component';
import { FavouriteRestaurantsComponent } from './components/favourite-restaurants/favourite-restaurants.component';
import { LoginComponent } from './components/login/login.component';
import { NavComponent } from './components/nav/nav.component';
import { AlertComponent } from './alert.component';
import { ConfirmComponent } from './confirm.component';
import { ForgotPasswordComponent } from './components/login/forgot-password.component';

import { ZomatoService } from './services/zomato.service';
import { UsersService } from './services/users.service';
import { DialogsService } from "./services/dialogs.service";
import { AuthGuardService } from "./auth/auth-guard.service";
import { AuthService } from "./auth/auth.service";
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchRestaurantsComponent,
    DisplayRestaurantsComponent,
    FavouriteRestaurantsComponent,
    LoginComponent,
    NavComponent,
    AlertComponent,
    ConfirmComponent,
    ForgotPasswordComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    BootstrapModalModule,
    MatDialogModule,
    MatButtonModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    NgxPaginationModule,
    FormsModule
  ],
  entryComponents:[AlertComponent,ConfirmComponent],
  providers: [ZomatoService, UsersService, DialogsService, AuthGuardService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
