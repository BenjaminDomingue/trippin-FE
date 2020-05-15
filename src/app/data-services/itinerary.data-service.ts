import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Itinerary } from '../models/itinerary.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItineraryDataService {
  baseUrl = 'https://localhost:5000/api/user/';

  constructor(private readonly httpClient: HttpClient) {
    this.saveItinerary =
      this
        .saveItinerary
        .bind(this);

    this.getItineraryById =
      this  
        .getItineraryById
        .bind(this);
  }

  saveItinerary(itinerary: Itinerary, userId: string) {
    console.log(`${this.baseUrl}${userId}` + '/itinerary');
    return this.httpClient
      .post(`${this.baseUrl}${userId}` + '/itinerary', itinerary)
      .pipe(map((response: any) => {
        const returnedItinerary = response;
      }));
  }

  getItineraryById(itineraryId: string) {
    return this.httpClient
      .get(`${this.baseUrl}` + 'itineraries/' + `${itineraryId}`)
      .pipe(map((response: Itinerary) => {
        return response;

      }))
  }
}
