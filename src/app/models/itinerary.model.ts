import { City } from './city.model';
import { TravelMode } from './travelModeEnum.mode';
import { MapStyleJSONModel } from './map-style-json.model';

export interface Itinerary {
  id: string,
  name: string,
  cities: City[],
  travelMode: TravelMode,
  mapStyleJsonModel: MapStyleJSONModel
}
