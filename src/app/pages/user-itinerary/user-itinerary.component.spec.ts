import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserItineraryComponent } from './user-itinerary.component';

describe('UserItineraryComponent', () => {
  let component: UserItineraryComponent;
  let fixture: ComponentFixture<UserItineraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserItineraryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserItineraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
