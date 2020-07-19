import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { UserItinerariesComponent } from "./user-itineraries.component";

describe("ItineraryPageComponent", () => {
  let component: UserItinerariesComponent;
  let fixture: ComponentFixture<UserItinerariesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserItinerariesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserItinerariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
