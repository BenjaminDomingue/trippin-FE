import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Itinerary } from "src/app/models/itinerary.model";
import { City } from "src/app/models/city.model";
import { TravelMode } from "src/app/models/travelModeEnum.mode";
import { ItineraryService } from "src/app/services/itinerary.service";
import { AuthorizationService } from "src/app/services/authorization.service";

@Component({
  selector: "app-new-itinerary",
  templateUrl: "./new-itinerary.component.html",
  styleUrls: ["./new-itinerary.component.css"],
})
export class NewItineraryComponent implements OnInit {
  userId: string | undefined;
  itinerary: Itinerary = {
    id: "",
    name: "",
    cities: [],
    travelMode: TravelMode.DRIVING,
  };
  city: City = { id: "" };
  cities: City[];
  beginningLat: number;
  beginningLng: number;
  zoom: number;
  myLatLng: any;
  mapProperties: any;
  place: any;
  map: any;
  marker: any;
  markers = [];
  origin: any;
  destination: any;
  places = [];
  selectedTravelMode: TravelMode;
  // directionsService = new google.maps.DirectionsService();
  // directionsRenderer = new google.maps.DirectionsRenderer();
  inputFields = [{ id: 0 }, { id: 1 }];
  autocompletes = [];

  @ViewChild("googlemap", { static: true }) mapView: ElementRef;

  ngOnInit() {
    this.initMap();
  }

  constructor(
    private readonly itineraryService: ItineraryService,
    private readonly authorizationService: AuthorizationService
  ) { }

  initMap() {
    this.setMapAndGetCurrentPosition();
  }

  setMapAndGetCurrentPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.beginningLat = position.coords.latitude;
        this.beginningLng = position.coords.longitude;
        this.myLatLng = new google.maps.LatLng({
          lat: this.beginningLat,
          lng: this.beginningLng,
        });

        this.mapProperties = {
          center: this.myLatLng,
          zoom: 14,
          mapTypeId: "roadmap",
        };
        this.map = new google.maps.Map(
          document.getElementById("googlemap"),
          this.mapProperties
        );
      });
    }
  }

  onPlaceChanged(autocomplete: any) {
    this.place = autocomplete.getPlace();
    if (this.place.geometry) {
      this.map.panTo(this.place.geometry.location);
      this.map.setZoom(6);
    }

    this.marker = new google.maps.Marker({
      position: this.place.geometry.location,
      map: this.map,
    });

    this.places.push(this.place);

    const city = this.getCityProperties(this.place, this.city);
    this.itinerary.cities.push(city);
    for (let i = 0; i < this.places.length; i++) {
      const directionsRenderer = new google.maps.DirectionsRenderer();
      const directionsService = new google.maps.DirectionsService();
      this.getDirection(this.map, directionsRenderer, directionsService);
    }
  }

  getCityProperties(place: any, city: City) {
    city = { id: "" };
    city.name = place.formatted_address;
    city.lat = place.geometry.location.lat();
    city.lng = place.geometry.location.lng();
    city.id = place.place_id;
    return city;
  }

  getDirection(map, directionsRenderer, directionsService) {
    directionsRenderer.setMap(map);

    for (let i = 0; i < this.places.length; i++) {
      const start = this.places[i].place_id;
      const end = this.places[i + 1].place_id;
      const request = {
        origin: { placeId: start },
        destination: { placeId: end },
        travelMode: google.maps.TravelMode[this.selectedTravelMode],
      };

      directionsService.route(request, function (result, status) {
        if (status === "OK") {
          directionsRenderer.setDirections(result);
        }
      });
    }
  }

  saveItinerary(itinerary: Itinerary) {
    this.userId = this.authorizationService.userId;
    this.itineraryService.saveItinerary(itinerary, this.userId).subscribe();
  }

  receivedSelectedTravelMode($event) {
    this.selectedTravelMode = $event;
    for (let i = 0; i < this.places.length; i++) {
      const directionsRenderer = new google.maps.DirectionsRenderer();
      const directionsService = new google.maps.DirectionsService();
      this.getDirection(this.map, directionsRenderer, directionsService);
    }
  }

  add() {
    const input = { id: this.inputFields.length };
    this.inputFields = this.inputFields.concat(input);
  }

  inputChange(event: any, index: number) {
    const input = document.getElementById("searchCity-" + index);

    let autocomplete = this.autocompletes.find(
      (element) => element.id === index
    );

    if (autocomplete === undefined) {
      autocomplete = {
        id: index,
        autocomplete: new google.maps.places.Autocomplete(input as any),
      };
      this.autocompletes.push(autocomplete);
      google.maps.event.addListener(
        autocomplete.autocomplete,
        "place_changed",
        () => this.onPlaceChanged(autocomplete.autocomplete)
      );
    }
  }
}
