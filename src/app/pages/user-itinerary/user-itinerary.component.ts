import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnChanges } from "@angular/core";
import { City } from "src/app/models/city.model";
import { ItineraryInformation } from "src/app/models/itineraryInformation.model";
import { Itinerary } from "src/app/models/itinerary.model";
import { ActivatedRoute } from "@angular/router";
import { ItineraryService } from "src/app/services/itinerary.service";
import { AuthorizationService } from "src/app/services/authorization.service";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatSelectChange } from '@angular/material/select';

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
  map: google.maps.Map;
  marker: any;
  markers = [];
  origin: any;
  destination: any;
  itineraryInformation: ItineraryInformation;
  information: ItineraryInformation;
  itinerary: Itinerary | undefined;
  itineraryId: string | undefined;
  userId: string | undefined;
  stylesJson: any;
  styledMapElements = ["road", "water", "land"];
  color = "#FF0000";
  isOpened = false;
  white = "#FFFAFA";
  selectedColor = "";
  yes = false;

  @ViewChild("googlemap", { static: true }) mapView: ElementRef;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly itineraryService: ItineraryService,
    private readonly authorizationService: AuthorizationService,
    private readonly http: HttpClient
  ) { }

  ngOnInit() {
    this.getSelectedMapLayoutColorJSON(1, "");

    this.route.params.subscribe((params) => {
      this.itineraryId = params.itineraryId;
    });

    this.getItineraryById();
  }

  getSelectedMapLayoutColorJSON(index: number, elementToStyle: string) {
    switch (index) {
      case 1:
        this.stylesJson = this.http.get("./assets/map-styles-selection/map-styles-silver.json");
        break;
      // case 2:
      //   this.stylesJson = this.http.get("./assets/map-styles-selection/map-styles-retro.json");
      //   break;
      // case 3:
      //   this.stylesJson = this.http.get("./assets/map-styles-selection/map-styles-aubergine.json");
      //   break;
      // case 4:
      //   this.stylesJson = this.http.get("./assets/map-styles-selection/map-styles-dark.json");
      //   break;
      // case 5:
      //   this.stylesJson = this.http.get("./assets/map-styles-selection/map-styles-silver.json");
      //   break;
    }
    this.stylesJson.subscribe((data) => {
      if (data != null) {
        switch (elementToStyle) {
          case "land":
            data[0]["stylers"][0]["color"] = this.selectedColor;
            break;
          case "water":
            data[16]["stylers"][0]["color"] = this.selectedColor;
            break;
          case "road":
            data[9]["stylers"][0]["color"] = this.selectedColor;
            data[10]["stylers"][0]["color"] = this.selectedColor;
            data[11]["stylers"][0]["color"] = this.selectedColor;
            break;
        }
        this.setMap(data);
      }
      else {
        this.setMap(data);
      }
    })
  }

  setMap(Json: any) {
    this.mapProperties = {
      zoom: 8,
      mapTypeId: "roadmap",
      styles: Json
    };

    if (this.map != undefined) {
      this.map.setOptions(this.mapProperties);
    }
    else {
      this.map = new google.maps.Map(
        document.getElementById("googlemap"),
        this.mapProperties
      );
    }
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

  receivedColor(selectedColor: string) {
    this.selectedColor = selectedColor;
  }

  selectElementTostyle(event: MatSelectChange) {
    event.source.placeholder = event.value;
    event.source.panelOpen;
    this.yes = true;
    const elementToStyle = event.value;
    this.getSelectedMapLayoutColorJSON(5, elementToStyle);
  }
}
