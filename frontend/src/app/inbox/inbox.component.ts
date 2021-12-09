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
  constructor(private store: Store<{ user: UserStore }>) {}

  ngOnInit(): void {
    this.store
      .select((state) => state.user.patients)
      .subscribe((data) => {
        this.data = data;
      });

    this.store
      .select((state) => state.user._id)
      .subscribe((id) => {
        this.userId = id;
      });
  }
}
