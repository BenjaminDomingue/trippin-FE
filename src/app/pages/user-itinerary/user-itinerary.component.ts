import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { City } from "src/app/models/city.model";
import { ItineraryInformation } from "src/app/models/itineraryInformation.model";
import { Itinerary } from "src/app/models/itinerary.model";
import { ActivatedRoute } from "@angular/router";
import { ItineraryService } from "src/app/services/itinerary.service";
import { AuthorizationService } from "src/app/services/authorization.service";
import { HttpClient } from '@angular/common/http';
import { MatSelectChange } from '@angular/material/select';
import { TravelMode } from 'src/app/models/travelModeEnum.mode';

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
  itinerary = {
    id: "", name: "", cities: [], travelMode: TravelMode.DRIVING, mapStyle: { id: "", mapStyleOptions: [] }
    ,
  }
  itineraryId: string | undefined;
  userId: string | undefined;
  stylesJson: any;
  styledMapElements = ["road", "water", "land"];
  color = "#FF0000";
  isOpened = false;
  white = "#FFFAFA";
  selectedColor = "";
  landSelected = "";
  waterSelected = "";
  roadSelected = "";

  @ViewChild("googlemap", { static: true }) mapView: ElementRef;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly itineraryService: ItineraryService,
    private readonly authorizationService: AuthorizationService,
    private readonly http: HttpClient,
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.itineraryId = params.itineraryId;
      this.userId = params.userId;

      this.getItineraryById();

    });

  }

  getSelectedMapLayoutColorJSON(elementToStyle: string) {
    console.log(this.itinerary.mapStyle.mapStyleOptions);
    if (this.itinerary.mapStyle.mapStyleOptions.length === 0) {
      this.stylesJson = this.http.get("./assets/map-styles-selection/map-styles-silver.json");
      this.stylesJson.subscribe((data) => {
        if (data != null) {
          switch (elementToStyle) {
            case "land":
              data[0]["stylers"][0]["color"] = this.selectedColor;
              this.itinerary.mapStyle.mapStyleOptions = data;
              this.itineraryService.saveItinerary(this.itinerary, this.userId).subscribe((itinerary) => {
              });
              break;
            case "water":
              this.stylesJson
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
      })
    }
    else {
      this.setMap(this.itinerary.mapStyle.mapStyleOptions);
    }
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
    this.onPlaceChanged();
  }

  getItineraryById() {
    this.userId = this.authorizationService.userId;
    this.itineraryService
      .getItineraryById(this.userId, this.itineraryId)
      .subscribe((response: Itinerary) => {
        this.itinerary = response;
        this.getSelectedMapLayoutColorJSON("");
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
    switch (event.value) {
      case "water":
        this.waterSelected = event.value;
        this.getSelectedMapLayoutColorJSON(this.waterSelected);
        break;
      case "land":
        this.landSelected = event.value;
        this.getSelectedMapLayoutColorJSON(this.landSelected);
        break;
      case "road":
        this.roadSelected = event.value;
        this.getSelectedMapLayoutColorJSON(this.roadSelected);
        break;
    }
  }
}
