import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountRenterComponent } from './account-renter.component';

describe('AccountRenterComponent', () => {
  let component: AccountRenterComponent;
  let fixture: ComponentFixture<AccountRenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountRenterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountRenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
