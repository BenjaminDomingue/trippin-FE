import { Injectable } from '@angular/core';
import { HttpRequestService } from '../services/http-request.service';
import { AppConfig } from '../constants/app.config';
import { MapStyleJSONModel } from '../models/map-style-json.model';

@Injectable({
  providedIn: 'root'
})
export class MapDataService {
  constructor(private readonly httpRequestService: HttpRequestService) {
    this.updateMapStylesJson = this.updateMapStylesJson.bind(this);
  }

  updateMapStylesJson(json: string) {
    const url = `${AppConfig.current.apiBaseEndpoint}/maps/map-style/new`;
    return this.httpRequestService.post<string, MapStyleJSONModel>(url, json);
  }
}