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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SignUpFormComponent } from './components/save-button/sign-up-form/sign-up-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

@NgModule({
  declarations: [
    AppComponent,
    MapDisplayComponent,
    MapDisplayComponent,
    SaveButtonComponent,
    NavbarComponent,
    LoginPageComponent,
    SignUpFormComponent,
    SignUpFormComponent,
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
  ],
  providers: [
    AuthorizationDataService,
    AuthorizationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
