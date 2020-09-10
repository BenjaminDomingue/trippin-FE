import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { Itinerary } from "src/app/models/itinerary.model";
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
    mapStyle: { id: "", mapStyleOptions: [] }
  };
  userId: string | undefined;
  itineraries: Itinerary[] | undefined;

  @ViewChild("googlemap", { static: true }) mapView: ElementRef;

  ngOnInit() {
    this.userId = this.authorizationService.userId;
    this.getUserItineraries();
  }

  constructor(
    private readonly authorizationService: AuthorizationService,
    private readonly itineraryService: ItineraryService,
    private readonly router: Router
  ) { }

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
