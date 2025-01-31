import { Injectable } from '@angular/core';
import { ItineraryDataService } from '../data-services/itinerary.data-service';

@Injectable({
  providedIn: 'root'
})
export class ItineraryService {
  saveItinerary = this.itineraryDataService.saveItinerary;
  getItineraryById = this.itineraryDataService.getItineraryById;
  updateItinerary = this.itineraryDataService.updateItinerary;

  constructor(private readonly itineraryDataService: ItineraryDataService) { }
}
