import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SaveButtonComponent } from './components/save-button/save-button.component';
import { NavbarComponent } from './components/save-button/navbar/navbar.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MatButtonModule } from '@angular/material/button';
import { AuthorizationDataService } from './data-services/authorization.data-service';
import { AuthorizationService } from './services/authorization.service';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SignUpFormComponent } from './components/save-button/sign-up-form/sign-up-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { MapComponent } from './pages/map/map.component';
import { ItineraryPageComponent } from './pages/itinerary-page/itinerary-page.component';
import { ItineraryDataService } from './data-services/itinerary.data-service';
import { ItineraryService } from './services/itinerary.service';

@NgModule({
  declarations: [
    AppComponent,
    SaveButtonComponent,
    NavbarComponent,
    LoginPageComponent,
    SignUpFormComponent,
    SignUpFormComponent,
    UserPageComponent,
    MapComponent,
    ItineraryPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatButtonModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    FormsModule,
  ],
  providers: [
    AuthorizationDataService,
    AuthorizationService,
    ItineraryDataService,
    ItineraryService,
  ],
  exports: [
    SaveButtonComponent,
    NavbarComponent,
    LoginPageComponent,
    SignUpFormComponent,
    SignUpFormComponent,
    UserPageComponent,
    MapComponent,
    ItineraryPageComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
