import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    component.data = {
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
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
