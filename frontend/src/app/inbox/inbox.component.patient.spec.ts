import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { InboxComponent } from './inbox.component';

const initialState = {
  user: {
    _id: '123',
    role: 'Patient',
    professionals: [
      {
        refData: { _id: '1234' },
        chatRef: {
          _id: '12345',
          messages: [{ id: '123', from: '1234', read: false }],
        },
      },
    ],
  },
};

describe('InboxComponent', () => {
  let component: InboxComponent;
  let fixture: ComponentFixture<InboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InboxComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
