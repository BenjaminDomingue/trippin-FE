import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Itinerary } from 'src/app/models/itinerary.model';
import { City } from 'src/app/models/city.model';
import { ItineraryInformationService } from 'src/app/services/itinerary-information.service';

@Component({
  selector: 'app-itinerary-page',
  templateUrl: './itinerary-page.component.html',
  styleUrls: ['./itinerary-page.component.css']
})
export class ItineraryPageComponent implements OnInit {

  @Output()
  handleSaveEvent = new EventEmitter<Itinerary>();

  itinerary: Itinerary = { id: "", name: "", cities: [] };
  city: City = { id: "",};
  cities: City[];
  zoom: number;
  myLatLng: any;
  mapProperties: any;
  input: any;
  place: any;
  map: any;
  marker: any;
  markers = [];
  origin: any;
  destination: any;
  places = [];


  @ViewChild('googlemap', { static: true }) mapView: ElementRef;

  ngOnInit() {
    this.initMap();
  }

  constructor(private readonly itineraryInformationService: ItineraryInformationService) {
  }

  initMap() {
    this.setMap();
  }

  setMap() {
        this.mapProperties = {
          center: { lat: 45.508888, lng: -73.5673 },
          zoom: 14,
          mapTypeId: 'roadmap'
        };
        this.map = new google.maps.Map(document.getElementById('googlemap'), this.mapProperties);
  }

  getItinerariesInformation(itinerary: Itinerary){
    this.itinerary = itinerary;
    if (this.itinerary != null){
      this.itineraryInformationService.getItineraryById(this.itinerary.id).subscribe(
        response => {
          this.itinerary = response;
        }
      )
    }
  }

  // onPlaceChanged() {
  //   this.place = this.autocomplete.getPlace();

  //   if (this.place.geometry) {
  //     this.map.panTo(this.place.geometry.location);
  //     this.map.setZoom(6);
  //   }

  //   this.marker = new google.maps.Marker({
  //     position: this.place.geometry.location,
  //     map: this.map,
  //   });

  //   this.places.push(this.place);

  //   var city = this.getCityProperties(this.place, this.city);
  //   this.itinerary.cities.push(city);

  //   for (let i = 0; i < this.places.length; i++) {
  //     this.getDirection(this.map, this.places[i].place_id, this.places[i + 1].place_id);
  //   }
  // }

  getCityProperties(place: any, city: City) {
    city = { id: "",}
    city.name = place.formatted_address;
    city.lat = place.geometry.location.lat();
    console.log(typeof (city.lat));
    city.lng = place.geometry.location.lng();
    return city;
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


}
