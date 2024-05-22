import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPackageItineraryComponent } from './edit-package-itinerary.component';

describe('EditPackageItineraryComponent', () => {
  let component: EditPackageItineraryComponent;
  let fixture: ComponentFixture<EditPackageItineraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPackageItineraryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPackageItineraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
