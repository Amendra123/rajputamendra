import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHotelItineraryComponent } from './add-hotel-itinerary.component';

describe('AddHotelItineraryComponent', () => {
  let component: AddHotelItineraryComponent;
  let fixture: ComponentFixture<AddHotelItineraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddHotelItineraryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddHotelItineraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
