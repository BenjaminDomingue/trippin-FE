import { Component, OnInit, Input, PipeTransform, Output, EventEmitter } from '@angular/core';
import { TravelMode } from 'src/app/models/travelModeEnum.mode';

@Component({
  selector: 'app-select-menu',
  templateUrl: './select-menu.component.html',
  styleUrls: ['./select-menu.component.css']
})
export class SelectMenuComponent implements OnInit {
  travelModeArray = Object.keys(TravelMode).map(key => TravelMode[key as any])
  selectedTravelMode: any;

  @Output()
    sendSelectedTravelMode = new EventEmitter<string>();

  ngOnInit() {
    this.travelModeArray;
  }

  selectChangeHandler(event: any) {
    this.selectedTravelMode = event.target.value;
    this.sendSelectedTravelMode.emit(this.selectedTravelMode);
  }
}
