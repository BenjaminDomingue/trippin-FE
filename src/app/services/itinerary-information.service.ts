import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Itinerary } from '../models/itinerary.model';
import { ItineraryDataService } from '../data-services/itinerary.data-service';
import { ItineraryInformation } from '../models/itineraryInformation.model';

@Injectable({
  providedIn: 'root'
})
export class ItineraryInformationService {

  getItineraryById = this.itinerarieDataService.getItineraryById;

  private _itineraryInformation: BehaviorSubject<ItineraryInformation> = new BehaviorSubject<ItineraryInformation>(null);

  constructor(private readonly itinerarieDataService: ItineraryDataService) { }

  setItinerary(itineraryInformation: ItineraryInformation){
    this._itineraryInformation.next(itineraryInformation);
  }

  getItinerary(): ItineraryInformation {
    return this._itineraryInformation.getValue();
  }
}
