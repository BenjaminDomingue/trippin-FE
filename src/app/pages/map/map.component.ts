import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { Itinerary } from 'src/app/models/itinerary.model';
import { City } from 'src/app/models/city.model';
import { TravelMode } from 'src/app/models/travelModeEnum.mode';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {

  @Output()
  handleSaveEvent = new EventEmitter<Itinerary>();

  itinerary: Itinerary = { id: "", name: "", cities: [], travelMode: TravelMode.DRIVING };
  city: City = { id: ""};
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
  selectedTravelMode: any;
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  inputFields = [{id: 0}];
  autocomplete = [];

  @ViewChild('googlemap', { static: true }) mapView: ElementRef;

  ngOnInit() {
    this.initMap();

  }

  ngAfterViewInit(){
    // this.initMap();
  }

  constructor() {
  }

  initMap() {
    this.setMapAndGetCurrentPosition();
    // this.initAutocomplete(0);
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

    var city = this.getCityProperties(this.place, this.city);
    this.itinerary.cities.push(city);

  }

  getCityProperties(place: any, city: City) {
    city = { id: ""};
    city.name = place.formatted_address;
    city.lat = place.geometry.location.lat();
    city.lng = place.geometry.location.lng();
    city.id = place.place_id;
    return city;
  }

  getDirection(map, place1, place2, directionsRenderer, directionsService) {
    directionsRenderer.setMap(map);

    var start = place1;
    var end = place2;
    var request = {
      origin: { 'placeId': start },
      destination: { 'placeId': end },
      travelMode: google.maps.TravelMode.DRIVING,
      // travelMode: google.maps.TravelMode[this.selectedTravelMode],
    };
    directionsService.route(request, function (result, status) {
      if (status == 'OK') {
        directionsRenderer.setDirections(result);
      }
    });
  }

  saveItinerary() {
    return this.handleSaveEvent.emit(this.itinerary);
  }

  saveItineraryName(itineraryName: string) {
    this.itinerary.name = itineraryName;
    return this.handleSaveEvent.emit(this.itinerary);
  }

  receivedSelectedTravelMode($event) {
    this.selectedTravelMode = $event;
    for (let i = 0; i < this.places.length; i++) {
      this.getDirection(this.map, this.places[i].place_id, this.places[i + 1].place_id, this.directionsRenderer, this.directionsService);
    }
  }

  add(){ 
    var input = {id: this.inputFields.length};
    this.inputFields = this.inputFields.concat(input)
  }

  inputChange(event: any, index: number){
    var input = document.getElementById('searchCity-' + index);

    this.autocomplete.push(new google.maps.places.Autocomplete(input as any, {
      fields: ["geometry"],
    }));

    google.maps.event.addListener(this.autocomplete[index], 'place_changed', () => this.onPlaceChanged(this.autocomplete[index]))
    // this.autocomplete[index].addListener('place_changed', () => this.onPlaceChanged(this.autocomplete[index]));
    this.autocomplete[index].set('place', null);
  }
}
