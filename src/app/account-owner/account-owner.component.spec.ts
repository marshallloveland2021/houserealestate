import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountOwnerComponent } from './account-owner.component';

describe('AccountOwnerComponent', () => {
  let component: AccountOwnerComponent;
  let fixture: ComponentFixture<AccountOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountOwnerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
