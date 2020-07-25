import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { UserPageComponent } from "./pages/user-page/user-page.component";
import { UserItinerariesComponent } from "./pages/user-itineraries/user-itineraries.component";
import { RegistrationComponent } from "./pages/registration/registration.component";
import { UserItineraryComponent } from "./pages/user-itinerary/user-itinerary.component";
import { NewItineraryComponent } from "./pages/new-itinerary/new-itinerary.component";

const routes: Routes = [
  {
    path: "login",
    component: LoginPageComponent,
  },
  {
    path: "registration",
    component: RegistrationComponent,
  },
  {
    path: "users/:userId",
    component: UserPageComponent,
  },
  {
    path: "users/:userId/itineraries",
    component: UserItinerariesComponent,
  },
  {
    path: "users/:userId/itineraries/new",
    component: NewItineraryComponent,
  },
  {
    path: "users/:userId/itineraries/:itineraryId",
    component: UserItineraryComponent,
  },
  { path: "", component: UserPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
