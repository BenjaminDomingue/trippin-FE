import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { UserPageComponent } from "./pages/user-page/user-page.component";
import { ItineraryPageComponent } from "./pages/itinerary-page/itinerary-page.component";
import { RegistrationComponent } from "./pages/registration/registration.component";
import { MapComponent } from "./pages/map/map.component";

const routes: Routes = [
  { path: "login", component: LoginPageComponent },
  { path: "registration", component: RegistrationComponent },
  { path: "users/:userId", component: UserPageComponent },
  { path: "users/:userId/itineraries", component: ItineraryPageComponent },
  { path: "users/:userId/itineraries/new", component: MapComponent },
  { path: "", component: RegistrationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
