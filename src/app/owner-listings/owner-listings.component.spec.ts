import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerListingsComponent } from './owner-listings.component';

describe('OwnerListingsComponent', () => {
  let component: OwnerListingsComponent;
  let fixture: ComponentFixture<OwnerListingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerListingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnerListingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
