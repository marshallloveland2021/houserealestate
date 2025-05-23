import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageInboxComponent } from './message-inbox.component';

describe('MessageInboxComponent', () => {
  let component: MessageInboxComponent;
  let fixture: ComponentFixture<MessageInboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageInboxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageInboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
