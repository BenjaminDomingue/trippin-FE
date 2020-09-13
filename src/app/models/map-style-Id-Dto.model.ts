import { MapStyle } from './map-style.model';

export interface MapStyleAndIdDto {
    itineraryId: string;
    userId: string;
    MapStyle: MapStyle;
}