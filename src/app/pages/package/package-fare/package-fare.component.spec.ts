import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageFareComponent } from './package-fare.component';

describe('PackageFareComponent', () => {
  let component: PackageFareComponent;
  let fixture: ComponentFixture<PackageFareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackageFareComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackageFareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
