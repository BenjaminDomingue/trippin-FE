import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { ItineraryPageComponent } from './pages/itinerary-page/itinerary-page.component';
import { RegistrationComponent } from './pages/registration/registration.component';


const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'user/:userId', component: UserPageComponent },
  { path: 'itinerary-page', component: ItineraryPageComponent },
  { path: 'registration', component: RegistrationComponent},
  { path: '', component: RegistrationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
