import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';

import { MessagesComponent } from './messages.component';

const initialState = {
  user: {
    _id: '123',
    patients: [
      {
        refData: { _id: '1234' },
        chatRef: {
          _id: '12345',
          messages: [
            {
              id: '123',
              from: '1234',
              to: '123',
              read: false,
              fromRole: 'Patient',
              text: 'test',
            },
          ],
        },
      },
    ],
  },
};

describe('MessagesComponent', () => {
  let component: MessagesComponent;
  let fixture: ComponentFixture<MessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MessagesComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesComponent);
    component = fixture.componentInstance;
    component.route = {
      parent: { snapshot: { paramMap: { get: () => '1234' } } },
    } as unknown as ActivatedRoute;
    spyOn(component.chatService, 'toggleMessage').and.returnValue(
      of({
        _id: '123',
        from: '1234',
        read: false,
        to: '123',
        fromRole: 'Patient',
        toRole: 'Professional',
        text: 'test',
      })
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('On init', () => {
    it('Expect chatservice.toggleMessage to have been called', () => {
      expect(component.chatService.toggleMessage).toHaveBeenCalled();
    });
  });

  describe('When sendMessage is called', () => {
    it('Expect chatservice.addMessageToChat to have been called', () => {
      component.newMessage = 'test';
      spyOn(component.chatService, 'addMessageToChat').and.returnValue(
        of({
          _id: '123',
          from: '1234',
          read: false,
          to: '123',
          fromRole: 'Patient',
          toRole: 'Professional',
          text: 'test',
        })
      );
      component.sendMessage();
      expect(component.chatService.addMessageToChat).toHaveBeenCalled();
    });
  });
});
