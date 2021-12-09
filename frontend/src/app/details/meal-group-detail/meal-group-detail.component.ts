import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  MealGroupModel,
  MealModel,
  UserStore,
} from 'src/app/models/interfaces';
import { MealService } from 'src/app/services/meal/meal.service';
import { MealGroupService } from 'src/app/services/mealGroup/meal-group.service';
import { deleteMealGroup } from 'src/app/services/store/actions/mealGroup.action';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-meal-group-detail',
  templateUrl: './meal-group-detail.component.html',
  styleUrls: ['./meal-group-detail.component.scss'],
})
export class MealGroupDetailComponent implements OnInit {
  id!: string;
  patientId!: string;
  data!: MealGroupModel;
  editing: boolean = false;
  newMeal: { name: string; amount: string } = {
    name: '',
    amount: '',
  };
  role!: string;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public mealGroupService: MealGroupService,
    public mealService: MealService,
    public tokenService: TokenService,
    public store: Store<{ user: UserStore }>
  ) {}

  ngOnInit(): void {
    const token = this.tokenService.getTokenFromLocalStorage() as string;

    this.store.select('user').subscribe((data) => {
      this.role = data.role;
    });

    this.id = this.route.snapshot.paramMap.get('id') as string;
    this.patientId = this.route.parent?.snapshot.paramMap.get('id') as string;

    this.mealGroupService.getMealGroup(this.id, token).subscribe((data) => {
      this.data = data;
    });
  }

  toggle() {
    this.editing = !this.editing;
  }

  changeTitleAndExtra() {
    const token = this.tokenService.getTokenFromLocalStorage() as string;
    this.mealGroupService
      .updateMealGroupName(this.id, this.data.name, this.data.extra, token)
      .subscribe();
  }

  addMeal() {
    if (this.newMeal.name && this.newMeal.amount) {
      const token = this.tokenService.getTokenFromLocalStorage() as string;
      this.mealService
        .createMealInMealGroup(
          {
            name: this.newMeal.name,
            amount: this.newMeal.amount,
            mealGroupId: this.id,
          },
          token
        )
        .subscribe((data) => {
          this.data.meals.push(data);
          this.newMeal.name = '';
          this.newMeal.amount = '';
        });
    }
  }

  deleteMeal(id: string) {
    const token = this.tokenService.getTokenFromLocalStorage() as string;
    this.mealService.deleteMealFromGroup(id, this.id, token).subscribe(() => {
      this.data.meals = this.data.meals.filter((meal) => meal._id !== id);
    });
  }

  editMeal(event: Event, mealId: string) {
    const token = this.tokenService.getTokenFromLocalStorage() as string;
    const target = event.target as HTMLInputElement;

    const mealToModify = this.data.meals.find(
      (meal) => meal._id === mealId
    ) as MealModel;

    const mealDto = {
      name: mealToModify.name,
      amount: mealToModify.amount,
    };

    return this.mealService
      .updateMealInfo(
        mealId,
        { ...mealDto, [target.name]: target.value },
        token
      )
      .subscribe((data) => {
        this.data.meals = this.data.meals.map((meal) => {
          if (meal._id === mealId) {
            return data;
          }
          return meal;
        });
      });
  }

  deleteMealGroup() {
    const token = this.tokenService.getTokenFromLocalStorage() as string;
    this.mealGroupService
      .deleteMealGroup(this.id, this.patientId, token)
      .subscribe(() => {
        this.store.dispatch(
          deleteMealGroup({
            mealGroupId: this.id,
            patientId: this.patientId,
          })
        );
        this.router.navigate(['/details/' + this.patientId + '/meal-groups']);
      });
  }
}
