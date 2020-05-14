import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './pages/map-display/login-page/login-page.component';
import { UserPageComponent } from './pages/map-display/user-page/user-page.component';
import { ItineraryPageComponent } from './pages/itinerary-page/itinerary-page.component';
import { MapComponent } from './pages/map-display/map/map.component';


const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'user', component: UserPageComponent },
  { path: '', component: LoginPageComponent },
  { path: 'itinerary-page', component: ItineraryPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
