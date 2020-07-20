import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Itinerary } from "../models/itinerary.model";
import { map } from "rxjs/operators";
import { AppConfig } from "../constants/app.config";
import { HttpRequestService } from "../services/http-request.service";

@Injectable({
  providedIn: "root",
})
export class ItineraryDataService {
  constructor(private readonly httpRequestService: HttpRequestService) {
    this.saveItinerary = this.saveItinerary.bind(this);

    this.getItineraryById = this.getItineraryById.bind(this);
  }

  saveItinerary(itinerary: Itinerary, userId: string) {
    const url = `${AppConfig.current.apiBaseEndpoint}/users/${userId}/itinerary`;
    return this.httpRequestService.post<Itinerary, Itinerary>(url, itinerary);
  }

  getItineraryById(userId: string, itineraryId: string) {
    const url = `${AppConfig.current.apiBaseEndpoint}/users/${userId}/itineraries/${itineraryId}`;

    return this.httpRequestService.get<Itinerary>(url);
  }
}
