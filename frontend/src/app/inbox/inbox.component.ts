import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  PatientModel,
  ProfessionalModel,
  UserStore,
} from '../models/interfaces';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss'],
})
export class InboxComponent implements OnInit {
  data!: PatientModel[] | ProfessionalModel[] | undefined;
  userId!: string;
  darkMode!: boolean;
  constructor(
    private store: Store<{ user: UserStore; darkMode: { darkMode: boolean } }>
  ) {}

  ngOnInit(): void {
    this.store.select('darkMode').subscribe((res) => {
      this.darkMode = res.darkMode;
    });

    this.store
      .select((state) => state.user)
      .subscribe((user) => {
        if (user.role === 'Professional') {
          this.data = user.patients;
        } else {
          this.data = user.professionals;
        }
      });

    this.store
      .select((state) => state.user._id)
      .subscribe((id) => {
        this.userId = id;
      });
  }
}
