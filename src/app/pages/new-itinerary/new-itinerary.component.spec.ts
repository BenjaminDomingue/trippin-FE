import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NewItineraryComponent } from "./new-itinerary.component";

describe("NewItineraryComponent", () => {
  let component: NewItineraryComponent;
  let fixture: ComponentFixture<NewItineraryComponent>;
  NewItineraryComponent;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewItineraryComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewItineraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
