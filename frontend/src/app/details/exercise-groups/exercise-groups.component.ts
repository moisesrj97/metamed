import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  ExerciseGroupModel,
  PatientModel,
  RefDataModel,
  UserStore,
} from 'src/app/models/interfaces';
import { ExerciseGroupService } from 'src/app/services/exerciseGroup/exercise-group.service';
import { addExerciseGroup } from 'src/app/services/store/actions/exerciseGroup.actions';
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
  input: string = '';

  constructor(
    public route: ActivatedRoute,
    public store: Store<{ user: UserStore }>,
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

  addGroup() {
    const token = this.tokenService.getTokenFromLocalStorage() as string;

    if (this.input.length > 0) {
      this.exerciseGroupService
        .addExerciseGroupToPatient(this.id, this.input, token)
        .subscribe((data) => {
          const newGroupId = data.patients
            ?.find(
              (patient) =>
                patient.refData === (this.id as unknown as RefDataModel)
            )
            ?.exerciseGroups.find(
              (group) => ![...this.data].includes(group)
            ) as string;

          this.fetchedData = [];

          this.store.dispatch(
            addExerciseGroup({
              exerciseGroupId: newGroupId,
              patientId: this.id,
            })
          );
        });
    }

    this.input = '';
  }
}
