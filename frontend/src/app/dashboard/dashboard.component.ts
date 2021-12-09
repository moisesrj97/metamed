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
  filteredUsersDataInfo: PatientModel[] | ProfessionalModel[] = [];
  role!: string;

  isModalOpen: boolean = false;

  constructor(private store: Store<{ user: UserStore }>) {}

  ngOnInit(): void {
    this.store.select('user').subscribe((user) => {
      this.role = user.role;
      if (user.role === 'Professional') {
        this.usersDataInfo = user.patients as PatientModel[];
        this.filteredUsersDataInfo = this.usersDataInfo;
      } else {
        this.usersDataInfo = user.professionals as ProfessionalModel[];
        this.filteredUsersDataInfo = this.usersDataInfo;
      }
    });
  }

  filterUsers(filter: string) {
    if (filter === '') {
      this.filteredUsersDataInfo = this.usersDataInfo;
    } else {
      this.filteredUsersDataInfo = this.usersDataInfo.filter((user) => {
        return (
          user.refData.name.toLowerCase() +
          ' ' +
          user.refData.surname.toLowerCase()
        ).includes(filter.toLowerCase());
      });
    }
  }
}
