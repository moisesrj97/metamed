import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserStore } from '../models/interfaces';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  navItems!: {
    label: string;
    route: string;
    icon: string;
    iconDark: string;
  }[];
  id!: string;
  role!: string;
  darkMode!: boolean;

  constructor(
    private route: ActivatedRoute,
    private store: Store<{ user: UserStore; darkMode: { darkMode: boolean } }>
  ) {}

  ngOnInit(): void {
    this.store.select('darkMode').subscribe((data) => {
      this.darkMode = data.darkMode;
    });
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
        iconDark: '../../assets/images/userDark.png',
      },
      {
        label: 'Exercise table',
        route: 'exercise-groups',
        icon: '../../assets/images/details-exercise.png',
        iconDark: '../../assets/images/details-exerciseDark.png',
      },
      {
        label: 'Meal plans',
        route: 'meal-groups',
        icon: '../../assets/images/detailes-meals.png',
        iconDark: '../../assets/images/detailes-mealsDark.png',
      },
      {
        label: 'Notes',
        route: 'notes',
        icon: '../../assets/images/details-notes.png',
        iconDark: '../../assets/images/details-notesDark.png',
      },
      {
        label: 'Messages',
        route: 'messages',
        icon: '../../assets/images/details-messages.png',
        iconDark: '../../assets/images/details-messagesDark.png',
      },
    ];
    this.id = this.route.snapshot.paramMap.get('id') as string;
  }
}
