import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  MealGroupModel,
  PatientModel,
  UserStore,
} from 'src/app/models/interfaces';
import { MealGroupService } from 'src/app/services/mealGroup/meal-group.service';
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

  constructor(
    private route: ActivatedRoute,
    private store: Store<{ user: UserStore }>,
    public mealGroupService: MealGroupService,
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

        this.data = result?.mealGroups;

        this.data?.forEach((group) => {
          this.mealGroupService.getMealGroup(group, token).subscribe((data) => {
            this.fetchedData.push(data);
          });
        });
      });
  }
}
