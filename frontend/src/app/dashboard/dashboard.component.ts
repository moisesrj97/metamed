import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  PatientModel,
  ProfessionalModel,
  UserStore,
} from '../models/interfaces';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  usersDataInfo: PatientModel[] | ProfessionalModel[] = [
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
  ];
  constructor(private store: Store<{ user: UserStore }>) {}

  ngOnInit(): void {
    /* this.store.select('user').subscribe((user) => {
      if (user.role === 'Professional') {
        this.usersDataInfo = user.patients as PatientModel[];
      } else {
        this.usersDataInfo = user.professionals as ProfessionalModel[];
      }
    }); */
  }
}
