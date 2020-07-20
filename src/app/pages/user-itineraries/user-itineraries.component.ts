import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { Itinerary } from "src/app/models/itinerary.model";
import { City } from "src/app/models/city.model";
import { ItineraryInformationService } from "src/app/services/itinerary-information.service";
import { ItineraryInformation } from "src/app/models/itineraryInformation.model";
import { TravelMode } from "src/app/models/travelModeEnum.mode";
import { AuthorizationService } from "src/app/services/authorization.service";
import { User } from "src/app/models/user.model";
import { ItineraryService } from "src/app/services/itinerary.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-user-itineraries",
  templateUrl: "./user-itineraries.component.html",
  styleUrls: ["./user-itineraries.component.css"],
})
export class UserItinerariesComponent implements OnInit {
  @Output()
  handleSaveEvent = new EventEmitter<Itinerary>();

  itinerary: Itinerary = {
    id: "",
    name: "",
    cities: [],
    travelMode: TravelMode.DRIVING,
  };
  userId: string | undefined;
  itineraries: Itinerary[] | undefined;

  // city: City = { id: "", name: "" };
  // cities: City[];
  // zoom: number;
  // mapProperties: any;
  // map: any;
  // marker: any;
  // markers = [];
  // origin: any;
  // destination: any;
  // itineraryInformation: ItineraryInformation;
  // information: ItineraryInformation;

  @ViewChild("googlemap", { static: true }) mapView: ElementRef;

  ngOnInit() {
    this.userId = this.authorizationService.userId;
    this.getUserItineraries();
    // this.initMap();
  }

  constructor(
    private readonly authorizationService: AuthorizationService,
    private readonly itineraryService: ItineraryService,
    private readonly router: Router
  ) {}

  getUserItineraries = () => {
    this.authorizationService
      .getUserById(this.userId)
      .subscribe((response: User) => {
        this.itineraries = response.itineraries;
      });
  };

  getItineraryById = (itineraryId: string) => {
    this.itineraryService
      .getItineraryById(this.userId, itineraryId)
      .subscribe(() => {
        this.router.navigate([
          "/users",
          this.userId,
          "itineraries",
          itineraryId,
        ]);
      });
  };
}
