import { Component, Output, EventEmitter } from "@angular/core";
import { TravelMode } from "src/app/models/travelModeEnum.mode";

@Component({
  selector: "app-select-menu",
  templateUrl: "./select-menu.component.html",
  styleUrls: ["./select-menu.component.css"],
})
export class SelectMenuComponent {
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

  @Output()
  sendSelectedTravelMode = new EventEmitter<string>();

  getTravelModeEnum = (travelMode: string) => {
    const modeObject = {};

    this.travelModeIcon.forEach((icon, i) => {
      modeObject[icon] = Object.values(TravelMode)[i];
    });
    return modeObject[travelMode];
  };

  selectTravelMode(event: string) {
    const travelMode = this.getTravelModeEnum(event);
    this.sendSelectedTravelMode.emit(travelMode);
  }
}
