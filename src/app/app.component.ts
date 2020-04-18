import { } from 'googlemaps';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  // theDrawingManager: any;
  marker: any;
  beginningLat: number;
  beginningLng: number;
  zoom: number;
  myLatLng: any;
  mapProperties: any;
  input: any;
  autocomplete: any;
  place: any;
  map: any;

  private geoCoder;

  @ViewChild('googlemap', { static: true }) mapView: ElementRef;

  ngOnInit() {
    // this.setCurrentPosition()
    this.initializeMap();
    // this.theDrawingManager = this.initializeDrawingManager(this.theMap);
  }

  initializeMap() {
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
        this.input = document.getElementById('autocomplete');

        this.autocomplete = new google.maps.places.Autocomplete(this.input, {
          types: ['(cities)'],
        });

        this.autocomplete.addListener('place_changed', () => this.onPlaceChanged());
        return this.map;
      });
    }
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
      title: 'Hello World!'
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
