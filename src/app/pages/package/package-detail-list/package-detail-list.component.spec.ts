import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageDetailListComponent } from './package-detail-list.component';

describe('PackageDetailListComponent', () => {
  let component: PackageDetailListComponent;
  let fixture: ComponentFixture<PackageDetailListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackageDetailListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackageDetailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
