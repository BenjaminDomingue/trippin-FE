import { MapStyleColor } from './map-style-colors.model';

export interface MapStyleOptions {
    featureType?: string;
    stylers?: MapStyleColor[];
    elementType?: string;
}