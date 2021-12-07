import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { PatientModel, UserStore } from 'src/app/models/interfaces';

@Component({
  selector: 'app-exercise-groups',
  templateUrl: './exercise-groups.component.html',
  styleUrls: ['./exercise-groups.component.scss'],
})
export class ExerciseGroupsComponent implements OnInit {
  id!: string;
  data: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private store: Store<{ user: UserStore }>
  ) {}

  ngOnInit(): void {
    this.id = this.route.parent?.snapshot.paramMap.get('id') as string;

    this.store
      .select((state) => state.user.patients)
      .subscribe((patients) => {
        const result = patients?.find(
          (patient) => patient.refData._id === this.id
        ) as PatientModel;

        this.data = result?.exerciseGroups;
      });
  }
}
