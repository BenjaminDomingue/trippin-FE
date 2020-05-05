import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Itinerary } from '../models/itinerary.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItineraryDataService {
  baseUrl = 'https://localhost:5000/api/itinerary/';

  constructor(private readonly httpClient: HttpClient) {
    this.saveItinerary =
      this
        .saveItinerary
        .bind(this);
  }

  saveItinerary(itinerary: Itinerary) {
    return this.httpClient
      .post(this.baseUrl + '${itineraryId}', itinerary)
      .pipe(map((response: any) => {
        const itinerary = response
      }));
  }
}
