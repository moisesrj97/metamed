import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  MealGroupModel,
  PatientModel,
  ProfessionalModel,
  RefDataModel,
  UserStore,
} from 'src/app/models/interfaces';
import { MealGroupService } from 'src/app/services/mealGroup/meal-group.service';
import { addMealGroup } from 'src/app/services/store/actions/mealGroup.action';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-meal-groups',
  templateUrl: './meal-groups.component.html',
  styleUrls: ['./meal-groups.component.scss'],
})
export class MealGroupsComponent implements OnInit {
  id!: string;
  data: string[] = [];
  fetchedData: MealGroupModel[] = [];
  input: string = '';
  role!: string;

  constructor(
    public route: ActivatedRoute,
    public store: Store<{ user: UserStore }>,
    public mealGroupService: MealGroupService,
    public tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.id = this.route.parent?.snapshot.paramMap.get('id') as string;
    const token = this.tokenService.getTokenFromLocalStorage() as string;

    this.store
      .select((state) => state.user)
      .subscribe((user) => {
        if (user.role === 'Professional') {
          const result = user.patients?.find(
            (patient) => patient.refData._id === this.id
          ) as PatientModel;

          this.role = 'Professional';

          this.data = result?.mealGroups;

          this.data?.forEach((group) => {
            this.mealGroupService
              .getMealGroup(group, token)
              .subscribe((data) => {
                this.fetchedData.push(data);
              });
          });
        } else {
          const result = user.professionals?.find(
            (professional) => professional.refData._id === this.id
          ) as ProfessionalModel;

          this.role = 'Patient';

          this.data = result?.mealGroups;

          this.data?.forEach((group) => {
            this.mealGroupService
              .getMealGroup(group, token)
              .subscribe((data) => {
                this.fetchedData.push(data);
              });
          });
        }
      });
  }

  addGroup() {
    const token = this.tokenService.getTokenFromLocalStorage() as string;

    if (this.input.length > 0) {
      this.mealGroupService
        .addMealGroupToPatient(this.id, this.input, token)
        .subscribe((data) => {
          const newGroupId = data.patients
            ?.find(
              (patient) =>
                patient.refData === (this.id as unknown as RefDataModel)
            )
            ?.mealGroups.find(
              (group) => ![...this.data].includes(group)
            ) as string;

          this.fetchedData = [];

          this.store.dispatch(
            addMealGroup({
              mealGroupId: newGroupId,
              patientId: this.id,
            })
          );
        });
    }

    this.input = '';
  }
}
