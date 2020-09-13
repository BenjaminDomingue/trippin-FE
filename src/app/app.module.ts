import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { MatButtonModule } from "@angular/material/button";
import { AuthorizationDataService } from "./data-services/authorization.data-service";
import { AuthorizationService } from "./services/authorization.service";
import { HttpClientModule } from "@angular/common/http";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { UserPageComponent } from "./pages/user-page/user-page.component";
import { NewItineraryComponent } from "./pages/new-itinerary/new-itinerary.component";
import { UserItinerariesComponent } from "./pages/user-itineraries/user-itineraries.component";
import { ItineraryDataService } from "./data-services/itinerary.data-service";
import { ItineraryService } from "./services/itinerary.service";
import { SelectMenuComponent } from "./components/select-menu/select-menu.component";
import { MatSelectModule } from "@angular/material/select";
import { MatIconModule } from "@angular/material/icon";
import { RegistrationComponent } from "./pages/registration/registration.component";
import { UserItineraryComponent } from "./pages/user-itinerary/user-itinerary.component";
import { ColorPickerModule } from 'ngx-color-picker';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginPageComponent,
    UserPageComponent,
    NewItineraryComponent,
    UserItinerariesComponent,
    SelectMenuComponent,
    RegistrationComponent,
    UserItineraryComponent,
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
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    ColorPickerModule,
    MatRadioModule,
    MatSliderModule,
  ],
  providers: [
    AuthorizationDataService,
    AuthorizationService,
    ItineraryDataService,
    ItineraryService,
  ],
  exports: [
    NavbarComponent,
    LoginPageComponent,
    UserPageComponent,
    NewItineraryComponent,
    UserItinerariesComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
