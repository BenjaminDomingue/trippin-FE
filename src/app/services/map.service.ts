import { Injectable } from '@angular/core';
import { MapDataService } from '../data-services/map.data-service';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  updateMapStylesJson = this.mapDataService.updateMapStylesJson;
  getMapStylesJson = this.mapDataService.getMapStylesJson;

  constructor(private readonly mapDataService: MapDataService) { }
}
