import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSubcategoryComponent } from './show-subcategory.component';

describe('ShowSubcategoryComponent', () => {
  let component: ShowSubcategoryComponent;
  let fixture: ComponentFixture<ShowSubcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowSubcategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowSubcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
