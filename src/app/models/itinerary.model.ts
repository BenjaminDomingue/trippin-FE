import { City } from './city.model';

export interface Itinerary {
  id: string,
  name: string,
  cities?: City[],
}
