import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapDisplayComponent } from './pages/map-display/map-display.component';
import { SaveButtonComponent } from './components/save-button/save-button.component';

@NgModule({
  declarations: [
    AppComponent,
    MapDisplayComponent,
    MapDisplayComponent,
    SaveButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
