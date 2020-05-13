import { Itinerary } from './itinerary.model';

export interface User {
    id: string,
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    itineraries: Itinerary[],
}