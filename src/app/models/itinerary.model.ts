import { City } from './city.model';
import { TravelMode } from './travelModeEnum.mode';
import { MapStyle } from './map-style.model';

export interface Itinerary {
  id: string,
  name: string,
  cities: City[],
  travelMode: TravelMode,
  mapStyle: MapStyle
}
