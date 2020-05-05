import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ItineraryService } from 'src/app/services/itinerary.service';
import { Itinerary } from 'src/app/models/itinerary.model';

@Component({
  selector: 'app-save-button',
  templateUrl: './save-button.component.html',
  styleUrls: ['./save-button.component.css']
})
export class SaveButtonComponent implements OnInit {

  @Output()
  handleSaveEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  saveItinerary() {
    return this.handleSaveEvent.emit();
  }

}
