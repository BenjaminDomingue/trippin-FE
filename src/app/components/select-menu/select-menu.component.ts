import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { TravelMode } from "src/app/models/travelModeEnum.mode";

@Component({
  selector: "app-select-menu",
  templateUrl: "./select-menu.component.html",
  styleUrls: ["./select-menu.component.css"],
})
export class SelectMenuComponent implements OnInit {
  travelModeArray = Object.keys(TravelMode).map(
    (key) => TravelMode[key as any]
  );

  @Output()
  sendSelectedTravelMode = new EventEmitter<string>();

  ngOnInit() {
    this.travelModeArray;
  }

  selectChangeHandler(event: any) {
    // this.selectedTravelMode.value = event.target.value;
    this.sendSelectedTravelMode.emit(event.target.value);
  }
}
