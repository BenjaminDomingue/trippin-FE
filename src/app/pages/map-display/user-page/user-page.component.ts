import { Component, OnInit } from '@angular/core';
import { } from 'googlemaps';
import { ItineraryService } from 'src/app/services/itinerary.service';
import { Itinerary } from 'src/app/models/itinerary.model';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit{
  showButtons: boolean | undefined;
  showMap: boolean | undefined;

  constructor(private readonly itineraryService: ItineraryService) { }

  ngOnInit() {
    this.showButtons = true;
    this.showMap = false;
    
  }

  saveItinerary(itinerary: Itinerary) {
    this.itineraryService.saveItinerary(itinerary).subscribe(response => {
      return response;
    });
  }

  createItinerary() {
    this.showMap = true;
    this.showButtons = false;
  }

  lookItineraries() {
    this.showButtons = false;
  }

  getUserItinerary() {
    
  }
}
