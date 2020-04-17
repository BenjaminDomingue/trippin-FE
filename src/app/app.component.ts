import { } from 'googlemaps';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  map: any;
  // theDrawingManager: any;
  marker = new google.maps.Marker();
  beginningLat: number;
  beginningLng: number;
  zoom: number;
  myLatLng: any;

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

        let myLatLng = new google.maps.LatLng({ lat: this.beginningLat, lng: this.beginningLng });

        let mapProperties = {
          center: myLatLng,
          zoom: 14,
          mapTypeId: 'roadmap'
        }
        let map = new google.maps.Map(document.getElementById('googlemap'), mapProperties);

        let input = <HTMLInputElement>document.getElementById('autocomplete');

        let autocomplete = new google.maps.places.Autocomplete(input, {
          types: ['(cities)'],
        });

        let places = new google.maps.places.PlacesService(map);

        // autocomplete.addListener('place_changed', this.onPlaceChanged);

        return map;
      });
    }
  }

  onPlaceChanged() {
    let myLatLng = new google.maps.LatLng({ lat: this.beginningLat, lng: this.beginningLng });

    let input = <HTMLInputElement>document.getElementById('autocomplete');

    let autocomplete = new google.maps.places.Autocomplete(input, {
      types: ['(cities)'],
    });

    let mapProperties = {
      center: myLatLng,
      zoom: 14,
      mapTypeId: 'roadmap'
    }

    let map = new google.maps.Map(document.getElementById('googlemap'), mapProperties);


    var place = autocomplete.getPlace();
    if (place.geometry) {
      map.panTo(place.geometry.location);
      map.setZoom(15);
    }
  }
}
  // initSearchBox(map) {
  //   var input = <HTMLInputElement>document.getElementById('searchInput');
  //   map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  //   var autocomplete = new google.maps.places.Autocomplete(input);
  //   autocomplete.bindTo('bounds', map);

  //   var infowindow = new google.maps.InfoWindow();
  //   var marker = new google.maps.Marker({
  //     map: map,
  //     anchorPoint: new google.maps.Point(0, -29)
  //   });

    //   autocomplete.addListener('place_changed', function () {
    //     infowindow.close();
    //     marker.setVisible(false);
    //     var place = autocomplete.getPlace();
    //     if (!place.geometry) {
    //       window.alert("Autocomplete's returned place contains no geometry");
    //       return;
    //     }

    //     // If the place has a geometry, then present it on a map.
    //     if (place.geometry.viewport) {
    //       map.fitBounds(place.geometry.viewport);
    //     } else {
    //       map.setCenter(place.geometry.location);
    //       map.setZoom(17);
    //     }
    //     marker.setIcon(({
    //       url: place.icon,
    //       size: new google.maps.Size(71, 71),
    //       origin: new google.maps.Point(0, 0),
    //       anchor: new google.maps.Point(17, 34),
    //       scaledSize: new google.maps.Size(35, 35)
    //     }));
    //     marker.setPosition(place.geometry.location);
    //     marker.setVisible(true);

    //     infowindow.open(map, marker);

    //   });
    // }
    // setCurrentPosition() {
    //   if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(position => {
    //       this.beginningLat = position.coords.latitude;
    //       this.beginningLng = position.coords.longitude;
    //       this.zoom = 16;
    //       this.myLatLng = new google.maps.LatLng({ lat: this.beginningLat, lng: this.beginningLng });
    //     });
    //   }
    // }

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
