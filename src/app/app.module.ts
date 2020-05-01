import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapDisplayComponent } from './pages/map-display/map-display.component';
import { SaveButtonComponent } from './components/save-button/save-button.component';
import { NavbarComponent } from './components/save-button/navbar/navbar.component';
import { LoginPageComponent } from './pages/map-display/login-page/login-page.component';
import { MatButtonModule } from '@angular/material/button';
import { AuthorizationDataService } from './data-services/authorization.data-service';
import { AuthorizationService } from './services/authorization.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    MapDisplayComponent,
    MapDisplayComponent,
    SaveButtonComponent,
    NavbarComponent,
    LoginPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatButtonModule,
    HttpClientModule
  ],
  providers: [
    AuthorizationDataService,
    AuthorizationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
