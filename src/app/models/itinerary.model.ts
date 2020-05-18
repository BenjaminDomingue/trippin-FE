import { City } from './city.model';
import { TransitiveCompileNgModuleMetadata } from '@angular/compiler';
import { TravelMode } from './travelModeEnum.mode';

export interface Itinerary {
  id: string,
  name: string,
  cities?: City[],
  travelMode: TravelMode,
}
