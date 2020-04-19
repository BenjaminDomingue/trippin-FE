import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { } from 'googlemaps';

@Component({
  selector: 'app-map-display',
  templateUrl: './map-display.component.html',
  styleUrls: ['./map-display.component.css']
})
export class MapDisplayComponent implements OnInit {

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
        }
        this.map = new google.maps.Map(document.getElementById('googlemap'), this.mapProperties);
      });
    }
  }

  initAutocomplete() {
    this.input = document.getElementById('autocomplete');

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
}

 // Initialize the drawing manager
  // initializeDrawingManager(map) {
  //   const drawingManager = new google.maps.drawing.DrawingManager({
  //     drawingMode: google.maps.drawing.OverlayType.POLYGON,
  //     drawingControl: true,
  //     drawingControlOptions: {
  //       position: google.maps.ControlPosition.TOP_CENTER,
  //       drawingModes: [
  //         google.maps.drawing.OverlayType.CIRCLE,
  //         google.maps.drawing.OverlayType.POLYGON,
  //       ],
  //     },
  //     markerOptions: {
  //       icon:
  //         'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
  //     },
  //     circleOptions: {
  //       fillColor: '#ffff00',
  //       fillOpacity: 1,
  //       strokeWeight: 5,
  //       clickable: true,
  //       editable: true,
  //       zIndex: 1,
  //     },
  //     polygonOptions: {
  //       fillColor: '#ffff00',
  //       fillOpacity: 1,
  //       clickable: true,
  //       editable: true,
  //       zIndex: 1,
  //     },
  //   });
  //   drawingManager.setMap(map);

  //   return drawingManager;
  // }
