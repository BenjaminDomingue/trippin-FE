import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { City } from "src/app/models/city.model";
import { ItineraryInformation } from "src/app/models/itineraryInformation.model";
import { ItineraryInformationService } from "src/app/services/itinerary-information.service";
import { Itinerary } from "src/app/models/itinerary.model";
import { ActivatedRoute } from "@angular/router";
import { ItineraryService } from "src/app/services/itinerary.service";
import { AuthorizationService } from "src/app/services/authorization.service";

@Component({
  selector: "app-user-itinerary",
  templateUrl: "./user-itinerary.component.html",
  styleUrls: ["./user-itinerary.component.css"],
})
export class UserItineraryComponent implements OnInit {
  City = { id: "", name: "" };
  cities: City[];
  zoom: number;
  mapProperties: any;
  map: any;
  marker: any;
  markers = [];
  origin: any;
  destination: any;
  itineraryInformation: ItineraryInformation;
  information: ItineraryInformation;
  itinerary: Itinerary | undefined;
  itineraryId: string | undefined;
  userId: string | undefined;

  @ViewChild("googlemap", { static: true }) mapView: ElementRef;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly itineraryService: ItineraryService,
    private readonly authorizationService: AuthorizationService
  ) {}

  ngOnInit(): void {
    this.setMap();
    this.route.params.subscribe((params) => {
      this.itineraryId = params.itineraryId;
    });
    this.getItineraryById();
  }

  setMap() {
    const mapProperties = {
      zoom: 14,
      mapTypeId: "roadmap",
    };
    this.map = new google.maps.Map(
      document.getElementById("googlemap"),
      mapProperties
    );
  }

  getItineraryById() {
    this.userId = this.authorizationService.userId;
    this.itineraryService
      .getItineraryById(this.userId, this.itineraryId)
      .subscribe((response: Itinerary) => {
        this.itinerary = response;
        this.onPlaceChanged();
      });
  }

  onPlaceChanged() {
    if (this.itinerary.cities) {
      this.itinerary.cities.forEach((city) => {
        this.map.panTo({ lat: city.lat, lng: city.lng });
        this.map.setZoom(6);
      });
    }

    this.itinerary.cities.forEach((city) => {
      this.marker = new google.maps.Marker({
        position: { lat: city.lat, lng: city.lng },
        map: this.map,
      });
    });

    for (let i = 0; i < this.itinerary.cities.length; i++) {
      this.getDirection(
        this.map,
        this.itinerary.cities[i].id,
        this.itinerary.cities[i + 1].id
      );
    }
  }

  getDirection(map, place1, place2) {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    const start = place1;
    const end = place2;
    const request = {
      origin: { placeId: start },
      destination: { placeId: end },
      travelMode: google.maps.TravelMode.DRIVING,
    };
    directionsService.route(request, function (result, status) {
      if (status === "OK") {
        directionsRenderer.setDirections(result);
      }
    });
  }
}
