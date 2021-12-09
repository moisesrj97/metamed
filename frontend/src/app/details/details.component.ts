import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  PatientModel,
  ProfessionalModel,
  UserStore,
} from '../models/interfaces';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  navItems!: { label: string; route: string; icon: string }[];
  id!: string;
  role!: string;

  constructor(
    private route: ActivatedRoute,
    private store: Store<{ user: UserStore }>
  ) {}

  ngOnInit(): void {
    this.store
      .select((state) => state.user.role)
      .subscribe((role) => {
        this.role = role;
      });
    this.navItems = [
      {
        label: 'Patient data',
        route: 'info',
        icon: '../../assets/images/user.png',
      },
      {
        label: 'Exercise table',
        route: 'exercise-groups',
        icon: '../../assets/images/details-exercise.png',
      },
      {
        label: 'Meal plans',
        route: 'meal-groups',
        icon: '../../assets/images/detailes-meals.png',
      },
      {
        label: 'Notes',
        route: 'notes',
        icon: '../../assets/images/details-notes.png',
      },
      {
        label: 'Messages',
        route: 'messages',
        icon: '../../assets/images/details-messages.png',
      },
    ];
    this.id = this.route.snapshot.paramMap.get('id') as string;
  }
}
