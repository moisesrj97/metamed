import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  ExerciseGroupModel,
  PatientModel,
  UserStore,
} from 'src/app/models/interfaces';
import { ExerciseGroupService } from 'src/app/services/exerciseGroup/exercise-group.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-exercise-groups',
  templateUrl: './exercise-groups.component.html',
  styleUrls: ['./exercise-groups.component.scss'],
})
export class ExerciseGroupsComponent implements OnInit {
  id!: string;
  data: string[] = [];
  fetchedData: ExerciseGroupModel[] = [];

  constructor(
    private route: ActivatedRoute,
    private store: Store<{ user: UserStore }>,
    public exerciseGroupService: ExerciseGroupService,
    public tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.id = this.route.parent?.snapshot.paramMap.get('id') as string;
    const token = this.tokenService.getTokenFromLocalStorage() as string;

    this.store
      .select((state) => state.user.patients)
      .subscribe((patients) => {
        const result = patients?.find(
          (patient) => patient.refData._id === this.id
        ) as PatientModel;

        this.data = result?.exerciseGroups;

        this.data?.forEach((group) => {
          this.exerciseGroupService
            .getExerciseGroup(group, token)
            .subscribe((data) => {
              this.fetchedData.push(data);
            });
        });
      });
  }
}
