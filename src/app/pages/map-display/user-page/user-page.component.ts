import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { } from 'googlemaps';
import { ItineraryService } from 'src/app/services/itinerary.service';
import { Itinerary } from 'src/app/models/itinerary.model';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  itineraries: Itinerary = {};

  beginningLat: number;
  beginningLng: number;
  zoom: number;
  myLatLng: any;
  mapProperties: any;
  input: any;
  autocomplete: any;
  place: any;
  map: any;
  marker: any;
  markers = [];
  origin: any;
  destination: any;
  places = [];
  theDrawingManager: any;

  constructor(private readonly itineraryService: ItineraryService) {

  }
  @ViewChild('googlemap', { static: true }) mapView: ElementRef;

  ngOnInit() {
    this.initMap();

  }

  initMap() {
    this.setMapAndGetCurrentPosition();
    this.initAutocomplete();
  }

  setMapAndGetCurrentPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.beginningLat = position.coords.latitude;
        this.beginningLng = position.coords.longitude;
        this.myLatLng = new google.maps.LatLng({ lat: this.beginningLat, lng: this.beginningLng });

        this.mapProperties = {
          center: this.myLatLng,
          zoom: 14,
          mapTypeId: 'roadmap'
        };
        this.map = new google.maps.Map(document.getElementById('googlemap'), this.mapProperties);
      });
    }
  }

  initAutocomplete() {
    this.input = document.getElementById('searchCity');

    this.autocomplete = new google.maps.places.Autocomplete(this.input, {
      types: ['(cities)'],
    });

    this.autocomplete.addListener('place_changed', () => this.onPlaceChanged());
    this.autocomplete.set('place', null);
  }

  onPlaceChanged() {
    this.place = this.autocomplete.getPlace();

    if (this.place.geometry) {
      this.map.panTo(this.place.geometry.location);
      this.map.setZoom(6);
    }

    this.marker = new google.maps.Marker({
      position: this.place.geometry.location,
      map: this.map,
    });
    this.places.push(this.place);

    for (let i = 0; i < this.places.length; i++) {
      this.getDirection(this.map, this.places[i].place_id, this.places[i + 1].place_id);
    }
  }

  getDirection(map, place1, place2) {
    var directionsService = new google.maps.DirectionsService();
    var directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    var start = place1;
    var end = place2;
    var request = {
      origin: { 'placeId': start },
      destination: { 'placeId': end },
      travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, function (result, status) {
      if (status == 'OK') {
        directionsRenderer.setDirections(result);
      }
    });
  }

  saveItinerary() {
    this.itineraryService.saveItinerary(this.itineraries);
  }
}
