import {
  Component,
  OnInit,
  Input,
  PipeTransform,
  Output,
  EventEmitter,
} from "@angular/core";
import { TravelMode } from "src/app/models/travelModeEnum.mode";
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-select-menu",
  templateUrl: "./select-menu.component.html",
  styleUrls: ["./select-menu.component.css"],
})
export class SelectMenuComponent implements OnInit {
  travelModeArray = Object.keys(TravelMode).map(
    (key) => TravelMode[key as any]
  );
  dropdownForm: FormGroup;

  @Output()
  sendSelectedTravelMode = new EventEmitter<string>();

  ngOnInit() {
    this.createForm();
    this.travelModeArray;
  }

  constructor(private fb: FormBuilder) {}

  createForm = () => {
    this.dropdownForm = this.fb.group({
      selectedTravelMode: [""],
    });
  };

  selectChangeHandler(event: any) {
    // this.selectedTravelMode.value = event.target.value;
    this.sendSelectedTravelMode.emit(event.target.value);
  }

  get selectedTravelMode() {
    return this.dropdownForm.get("dropdown");
  }
}
