import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  PatientModel,
  ProfessionalModel,
  UserStore,
} from '../models/interfaces';
import { AddModalComponent } from './add-modal/add-modal.component';
import { CardComponent } from './card/card.component';

import { DashboardComponent } from './dashboard.component';
import { SearchComponent } from './search/search.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let store: MockStore;
  let initialState = {
    user: {
      _id: '',
      role: 'Professional',
      patients: [
        {
          refData: {
            _id: '61ae36e84ca6906a6b9bc5c5',
            surname: 'Patient',
            profilePicture:
              'https://metamed-images.s3.eu-west-3.amazonaws.com/4ab2273c-ffeb-428a-a678-7b3e715c0deb',
            name: 'Moisés Rodríguez Jurado',
          },
          extraData: [],
          chatRef: {
            _id: '61ae374c4ca6906a6b9bc5cc',
            messages: [],
            patient: '61ae36e84ca6906a6b9bc5c5',
            professional: '61ae32db4ca6906a6b9bc593',
          },
          exerciseGroups: [],
          mealGroups: [],
          notes: [],
        },
      ],
      professionals: [
        {
          refData: {
            _id: '61ae36e84ca6906a6b9bc5c5',
            surname: 'Patient',
            profilePicture:
              'https://metamed-images.s3.eu-west-3.amazonaws.com/4ab2273c-ffeb-428a-a678-7b3e715c0deb',
            name: 'Moisés Rodríguez Jurado',
          },
          extraData: [],
          chatRef: {
            _id: '61ae374c4ca6906a6b9bc5cc',
            messages: [],
            patient: '61ae36e84ca6906a6b9bc5c5',
            professional: '61ae32db4ca6906a6b9bc593',
          },
          exerciseGroups: [],
          mealGroups: [],
          notes: [],
        },
      ],
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        CardComponent,
        AddModalComponent,
        SearchComponent,
      ],
      providers: [provideMockStore({ initialState })],
      imports: [HttpClientTestingModule],
    }).compileComponents();

    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('If user role is professional', () => {
    it('users is type patient', () => {
      expect(component.usersDataInfo[0]).toEqual({
        refData: {
          _id: '61ae36e84ca6906a6b9bc5c5',
          surname: 'Patient',
          profilePicture:
            'https://metamed-images.s3.eu-west-3.amazonaws.com/4ab2273c-ffeb-428a-a678-7b3e715c0deb',
          name: 'Moisés Rodríguez Jurado',
        },
        extraData: [],
        chatRef: {
          _id: '61ae374c4ca6906a6b9bc5cc',
          messages: [],
          patient: '61ae36e84ca6906a6b9bc5c5',
          professional: '61ae32db4ca6906a6b9bc593',
        },
        exerciseGroups: [],
        mealGroups: [],
        notes: [],
      });
    });
  });

  describe('If user role is patient', () => {
    it('users is type patient', () => {
      initialState = {
        user: {
          _id: '',
          role: 'Patient',
          patients: [
            {
              refData: {
                _id: '61ae36e84ca6906a6b9bc5c5',
                surname: 'Patient',
                profilePicture:
                  'https://metamed-images.s3.eu-west-3.amazonaws.com/4ab2273c-ffeb-428a-a678-7b3e715c0deb',
                name: 'Moisés Rodríguez Jurado',
              },
              extraData: [],
              chatRef: {
                _id: '61ae374c4ca6906a6b9bc5cc',
                messages: [],
                patient: '61ae36e84ca6906a6b9bc5c5',
                professional: '61ae32db4ca6906a6b9bc593',
              },
              exerciseGroups: [],
              mealGroups: [],
              notes: [],
            },
          ],
          professionals: [
            {
              refData: {
                _id: '61ae36e84ca6906a6b9bc5c5',
                surname: 'Patient',
                profilePicture:
                  'https://metamed-images.s3.eu-west-3.amazonaws.com/4ab2273c-ffeb-428a-a678-7b3e715c0deb',
                name: 'Moisés Rodríguez Jurado',
              },
              extraData: [],
              chatRef: {
                _id: '61ae374c4ca6906a6b9bc5cc',
                messages: [],
                patient: '61ae36e84ca6906a6b9bc5c5',
                professional: '61ae32db4ca6906a6b9bc593',
              },
              exerciseGroups: [],
              mealGroups: [],
              notes: [],
            },
          ],
        },
      };

      TestBed.resetTestingModule();
      expect(component.usersDataInfo[0]).toEqual({
        refData: {
          _id: '61ae36e84ca6906a6b9bc5c5',
          surname: 'Patient',
          profilePicture:
            'https://metamed-images.s3.eu-west-3.amazonaws.com/4ab2273c-ffeb-428a-a678-7b3e715c0deb',
          name: 'Moisés Rodríguez Jurado',
        },
        extraData: [],
        chatRef: {
          _id: '61ae374c4ca6906a6b9bc5cc',
          messages: [],
          patient: '61ae36e84ca6906a6b9bc5c5',
          professional: '61ae32db4ca6906a6b9bc593',
        },
        exerciseGroups: [],
        mealGroups: [],
        notes: [],
      });
    });
  });
});
