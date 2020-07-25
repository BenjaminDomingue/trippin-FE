import { Component, Output, EventEmitter, OnInit } from "@angular/core";
import { TravelMode } from "src/app/models/travelModeEnum.mode";
import { TravelModeObject } from 'src/app/models/travel-mode-object.model';

@Component({
  selector: "app-select-menu",
  templateUrl: "./select-menu.component.html",
  styleUrls: ["./select-menu.component.css"],
})
export class SelectMenuComponent implements OnInit {
  travelModeArray = Object.keys(TravelMode).map(
    (key) => TravelMode[key as any]
  );

  travelModeIcon = [
    "directions_car",
    "train",
    "directions_walk",
    "directions_bike",
    "local_airport",
  ];

  travelMode: TravelModeObject | undefined;
  isTravelModeSelectedArray = [];


  @Output()
  sendSelectedTravelMode = new EventEmitter<string>();

  ngOnInit() {
    this.generateIsTravelModeSelectedArray();
  }

  generateIsTravelModeSelectedArray = () => {
    this.travelModeIcon.forEach((travelMode) => {
      this.isTravelModeSelectedArray.push(new TravelModeObject(travelMode, false))
    })
    return this.isTravelModeSelectedArray;
  }

  getTravelModeEnum = (travelMode: string) => {
    const modeObject = {};

    this.travelModeIcon.forEach((icon, i) => {
      modeObject[icon] = Object.values(TravelMode)[i];
    });
    return modeObject[travelMode];
  };

  selectTravelMode(travelModeObject: TravelModeObject) {
    this.isTravelModeSelectedArray.forEach((travelModeSelected) => {
      if (travelModeSelected.travelMode === travelModeObject.travelMode) {
        travelModeSelected.isSelected = true;
      }
      else {
        travelModeSelected.isSelected = false;
      }
    })
    const travelMode = this.getTravelModeEnum(travelModeObject.travelMode);
    this.sendSelectedTravelMode.emit(travelMode);
  }
}
