import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerMessageInboxComponent } from './owner-message-inbox.component';

describe('OwnerMessageInboxComponent', () => {
  let component: OwnerMessageInboxComponent;
  let fixture: ComponentFixture<OwnerMessageInboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerMessageInboxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OwnerMessageInboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
