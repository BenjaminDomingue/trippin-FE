import { TravelMode } from './travelModeEnum.mode';

export interface DirectionsCreationInformation {
    id: string,
    directionsRenderer: google.maps.DirectionsRenderer,
    directionsService: google.maps.DirectionsService,
    selectedTravelMode: TravelMode
}