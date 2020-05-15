import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Itinerary } from 'src/app/models/itinerary.model';
import { City } from 'src/app/models/city.model';
import { ItineraryInformationService } from 'src/app/services/itinerary-information.service';
import { ItineraryInformation } from 'src/app/models/itineraryInformation.model';

@Component({
  selector: 'app-itinerary-page',
  templateUrl: './itinerary-page.component.html',
  styleUrls: ['./itinerary-page.component.css']
})
export class ItineraryPageComponent implements OnInit {

  @Output()
  handleSaveEvent = new EventEmitter<Itinerary>();

  itinerary: Itinerary = { id: "", name: "", cities: [] };
  city: City = { id: "", name:""};
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
  itineraryInformation: ItineraryInformation;
  information: ItineraryInformation;


  @ViewChild('googlemap', { static: true }) mapView: ElementRef;

  ngOnInit() {
    this.initMap();
  }

  constructor(private readonly itineraryInformationService: ItineraryInformationService) {
  }

  initMap() {
    this.setMap();
    this.getItinerary();
    this.setAllItineraryInformation();
  }

  setMap() {
        this.mapProperties = {
          center: { lat: 45.508888, lng: -73.5673 },
          zoom: 14,
          mapTypeId: 'roadmap'
        };
        this.map = new google.maps.Map(document.getElementById('googlemap'), this.mapProperties);
  }

  setAllItineraryInformation() {
    this.itineraryInformation = this.information;
    if (this.itineraryInformation != undefined) {
      this.getItinerariesInformation(this.itineraryInformation);
    }
  }

  getItinerariesInformation(itineraryInformation: ItineraryInformation){
    this.itineraryInformation = itineraryInformation;
    if (this.itineraryInformation != null) {
      this.itineraryInformationService.getItineraryById(this.itineraryInformation.id).subscribe(
        response => {
          this.itinerary = response;
          this.onPlaceChanged();
        }
      )
    }
  }

  onPlaceChanged() {
    // this.place = this.autocomplete.getPlace();

    if (this.itinerary.cities) {
      this.map.panTo( { lat: this.itinerary.cities[0].lat,lng: this.itinerary.cities[0].lng } )
      this.map.setZoom(6);
    }

    this.marker = new google.maps.Marker({
      position: { lat: this.itinerary.cities[0].lat,lng: this.itinerary.cities[0].lng },
      map: this.map,
    });

    // this.itinerary.cities.push(this.itinerary.cities[0]);

    // var city = this.getCityProperties(this.city);
    // this.itinerary.cities.push(city);

    // for (let i = 0; i < this.places.length; i++) {
    //   this.getDirection(this.map, this.itinerary.cities[i].id, this.itinerary.cities[i + 1].id);
    // }
  }

  getCityProperties(city: City) {
    city = { id: ""};
    city.name = this.itinerary.cities[0].name;
    // city.lat = place.geometry.location.lat();
    city.lat = this.itinerary.cities[0].lat;
    console.log(typeof (city.lat));
    // city.lng = place.geometry.location.lng();
    city.lng = this.itinerary.cities[0].lng;
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
private getItinerary(){
  const information = this.itineraryInformationService.getItinerary();

  if(information){
    this.information = information;
  }
}

}
