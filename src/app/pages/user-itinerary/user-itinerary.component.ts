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
import { MapStyle } from 'src/app/models/map-style.model';
import jsPDF from 'jspdf';
import html2canvas from "html2canvas"


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
  styledMapElementsColor = ["Road", "Water", "Land"];
  styledMapElementsPrecision = ["Roads", "Landmarks", "Labels"];
  color = "#FF0000";
  isOpened = false;
  white = "#FFFAFA";
  selectedColor = "";
  selectedElementToSTyle = "";

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

  setMap(mapStyleOptions: any) {
    this.mapProperties = {
      zoom: 8,
      mapTypeId: "roadmap",
      styles: mapStyleOptions,
      mapTypeControl: false

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

        this.setMap(this.itinerary.mapStyle.mapStyleOptions);
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

  setMapLayout(elementToStyle: string) {
    const mapStyleOptions = this.itinerary.mapStyle.mapStyleOptions;
    switch (elementToStyle) {
      case "Land":
        mapStyleOptions[0]["stylers"][0]["color"] = this.selectedColor;
        break;
      case "Water":
        mapStyleOptions[16]["stylers"][0]["color"] = this.selectedColor;
        break;
      case "Road":
        mapStyleOptions[9]["stylers"][0]["color"] = this.selectedColor;
        mapStyleOptions[10]["stylers"][0]["color"] = this.selectedColor;
        mapStyleOptions[11]["stylers"][0]["color"] = this.selectedColor;
        break;
    }
    this.itineraryService.updateItinerary(this.itinerary.id, this.itinerary.mapStyle, this.userId).subscribe((mapStyle: MapStyle) => {
      this.setMap(this.itinerary.mapStyle.mapStyleOptions);
    });
  }

  selectElementToStyle(event: MatSelectChange) {
    let selectedElementToStyle = "";
    switch (event.value) {
      case "Water":
        selectedElementToStyle = event.value;
        break;
      case "Land":
        selectedElementToStyle = event.value;
        break;
      case "Road":
        selectedElementToStyle = event.value;
        break;
    }
    this.setMapLayout(selectedElementToStyle);
  }

  exportMapAsPdf() {
    let dataPdf = document.getElementById('googlemap');
    const pdf = new jsPDF("l", "mm", "a4");
    pdf.setDisplayMode(2, 'single', 'UseOutlines');
    html2canvas(dataPdf, {
      allowTaint: true,
      useCORS: true,
      scrollY: -window.scrollY
    }).then((canvas) => {
      let img = canvas.toDataURL('image/png');
      pdf.addImage(img, 'png', 5, 15, 400, 200);
      pdf.save(`${this.itinerary.name}` + '.pdf');
    })
  }
}
