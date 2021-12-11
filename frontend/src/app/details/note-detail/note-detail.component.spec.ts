import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { SocketIoModule } from 'ngx-socket-io';
import { of } from 'rxjs';
import { UserStore } from 'src/app/models/interfaces';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';
import { config } from 'src/app/services/websocket/websocket.service.spec';
import { DetailsComponent } from '../details.component';

import { NoteDetailComponent } from './note-detail.component';

describe('NoteDetailComponent', () => {
  let component: NoteDetailComponent;
  let fixture: ComponentFixture<NoteDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NoteDetailComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'details/:id', component: DetailsComponent },
        ]),
        FormsModule,
        SocketIoModule.forRoot(config),
      ],
      providers: [provideMockStore(), FormBuilder, WebsocketService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteDetailComponent);
    component = fixture.componentInstance;
    spyOn(component.noteService, 'getNote').and.returnValue(
      of({
        _id: '123',
        author: '123',
        title: 'test',
        description: 'extra test',
      })
    );
    spyOn(component.tokenService, 'getTokenFromLocalStorage').and.returnValue(
      'test'
    );
    component.route = {
      snapshot: {
        paramMap: {
          get: () => '123',
        },
      },
      parent: {
        snapshot: {
          paramMap: {
            get: () => '123',
          },
        },
      },
    } as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When toggle is called', () => {
    it('Editing should change', () => {
      const prev = component.editing;
      component.toggle();
      expect(component.editing).not.toEqual(prev);
    });
  });

  describe('When changetitle is called', () => {
    it('updateNoteName should be called', () => {
      spyOn(component.noteService, 'updateNoteName').and.returnValue(
        of({
          _id: '123',
          name: 'test',
          surname: 'test',
          role: 'Professional',
          profilePicture: 'test.jpg',
          email: 'test',
          patients: [],
        })
      );
      component.changeTitleAndExtra();
      expect(component.noteService.updateNoteName).toHaveBeenCalled();
    });
  });

  describe('When deletNote is called', () => {
    it('.mealService.updatemealInfo should be called', () => {
      spyOn(component.noteService, 'deleteNote').and.returnValue(
        of({ _id: '', title: '', author: '', description: '' })
      );

      component.deleteNote();

      expect(component.noteService.deleteNote).toHaveBeenCalled();
    });
  });
});
