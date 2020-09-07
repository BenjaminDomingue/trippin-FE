import { Injectable } from '@angular/core';
import { MapDataService } from '../data-services/map.data-service';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  updateMapStylesJson = this.mapDataService.updateMapStylesJson;

  constructor(private readonly mapDataService: MapDataService) { }
}
