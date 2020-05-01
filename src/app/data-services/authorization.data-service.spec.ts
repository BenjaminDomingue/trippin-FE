/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthorizationDataService } from './authorization.data-service';

describe('Service: Authorization', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthorizationDataService]
    });
  });

  it('should ...', inject([AuthorizationDataService], (service: AuthorizationDataService) => {
    expect(service).toBeTruthy();
  }));
});
