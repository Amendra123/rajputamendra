import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHotelItineraryComponent } from './edit-hotel-itinerary.component';

describe('EditHotelItineraryComponent', () => {
  let component: EditHotelItineraryComponent;
  let fixture: ComponentFixture<EditHotelItineraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditHotelItineraryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditHotelItineraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
