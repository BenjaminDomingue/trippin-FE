import { TestBed } from '@angular/core/testing';

import { ItineraryInformationService } from './itinerary-information.service';

describe('ItineraryInformationService', () => {
  let service: ItineraryInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItineraryInformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
