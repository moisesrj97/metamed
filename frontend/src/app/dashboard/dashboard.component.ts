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
  usersDataInfo: PatientModel[] | ProfessionalModel[] = [];
  constructor(private store: Store<{ user: UserStore }>) {}

  ngOnInit(): void {
    this.store.select('user').subscribe((user) => {
      if (user.role === 'Professional') {
        this.usersDataInfo = user.patients as PatientModel[];
      } else {
        this.usersDataInfo = user.professionals as ProfessionalModel[];
      }
    });
  }
}
