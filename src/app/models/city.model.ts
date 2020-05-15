import { CityPosition } from './cityPosition.model';

export interface City {
  id: string,
  name?: string,
  lat?: number,
  lng?: number,
  position?: CityPosition,
}
