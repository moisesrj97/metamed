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
  navItems = [
    {
      label: 'Patient data',
      route: 'info',
    },
    {
      label: 'Exercise table',
      route: 'exercise-groups',
    },
    {
      label: 'Meal plans',
      route: 'meal-groups',
    },
    {
      label: 'Notes',
      route: 'notes',
    },
    {
      label: 'Messages',
      route: 'messages',
    },
  ];
  id!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') as string;
  }
}
