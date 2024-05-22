import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelItineraryComponent } from './hotel-itinerary.component';

describe('HotelItineraryComponent', () => {
  let component: HotelItineraryComponent;
  let fixture: ComponentFixture<HotelItineraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelItineraryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelItineraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
