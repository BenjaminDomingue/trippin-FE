import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Itinerary } from '../models/itinerary.model';
import { ItineraryDataService } from '../data-services/itinerary.data-service';

@Injectable({
  providedIn: 'root'
})
export class ItineraryInformationService {

  getItineraryById = this.itinerarieDataService.getItineraryById;

  private _itinerary: BehaviorSubject<Itinerary> = new BehaviorSubject<Itinerary>(null);

  constructor(private readonly itinerarieDataService: ItineraryDataService) { }

  setItinerary(itinerary: Itinerary){
    this._itinerary.next(itinerary);
  }

  getItinerary(): Itinerary {
    return this._itinerary.getValue();
  }
}
