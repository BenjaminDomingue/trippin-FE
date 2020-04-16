import { } from 'googlemaps';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  map: any;
  theDrawingManager: any;
  infoWindow: any;
  beginningLat: number;
  beginningLng: number;

  private geoCoder;

  @ViewChild('googlemap', { static: true }) mapView: ElementRef;

  ngOnInit() {
    this.map = this.initializeMap();
    // this.theDrawingManager = this.initializeDrawingManager(this.theMap);
  }

  // Initialize the map and get geolocalisation
  initializeMap() {
    this.map = new google.maps.Map(document.getElementById('googlemap'), {
      center: { lat: 45.4819173, lng: -73.5756072 },
      zoom: 6
    });
    this.infoWindow = new google.maps.InfoWindow;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        console.log(pos);
        this.infoWindow.setPosition(pos);
        this.infoWindow.setContent('Location found.');
        this.infoWindow.open(this.map);
        this.map.setCenter(pos);
      }, function () {
        handleLocationError(true, this.infoWindow, this.map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, this.infoWindow, this.map.getCenter());
    }
    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
      infoWindow.open(this.map);
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
}
