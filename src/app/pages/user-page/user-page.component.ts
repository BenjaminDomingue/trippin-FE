import { Component, OnInit } from "@angular/core";
import {} from "googlemaps";
import { Itinerary } from "src/app/models/itinerary.model";
import { AuthorizationService } from "src/app/services/authorization.service";
import { User } from "src/app/models/user.model";
import { Router } from "@angular/router";
import { ItineraryInformation } from "src/app/models/itineraryInformation.model";

@Component({
  selector: "app-user-page",
  templateUrl: "./user-page.component.html",
  styleUrls: ["./user-page.component.css"],
})
export class UserPageComponent implements OnInit {
  showButtons: boolean | undefined;
  showMap: boolean | undefined;
  user: User = {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    itineraries: [],
  };
  itineraryInformation: ItineraryInformation = { id: "", cities: [] };
  userId: string | undefined;

  constructor(
    private readonly authorizationServce: AuthorizationService,
    private readonly router: Router,
  ) {}

  ngOnInit() {
    this.userId = this.authorizationServce.userId;
    this.showButtons = true;
    this.showMap = false;
  }

  saveItinerary(itinerary: Itinerary) {
    // const userId = this.authorizationDataService.decodedToken.nameid;
    // this.itineraryService.saveItinerary(itinerary, userId).subscribe(response => {
    //   return response;
    // });
  }

  createItinerary() {
    this.router.navigate(["users", this.userId, "itineraries", "new"]);
  }

  lookItineraries() {
    this.showButtons = false;
    this.router.navigate(["users", this.userId, "itineraries"]);
  }

  getUserById(userId: string) {
    this.authorizationServce.getUserById(userId).subscribe((response) => {
      this.user = response;
    });
  }
}
