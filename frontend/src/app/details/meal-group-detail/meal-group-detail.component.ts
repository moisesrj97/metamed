import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
import { WebsocketService } from 'src/app/services/websocket/websocket.service';

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
  formGroup!: FormGroup;
  role!: string;
  darkMode!: boolean;
  userId!: string;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public mealGroupService: MealGroupService,
    public mealService: MealService,
    public tokenService: TokenService,
    public store: Store<{ user: UserStore; darkMode: { darkMode: boolean } }>,
    public fb: FormBuilder,
    public socket: WebsocketService
  ) {
    this.formGroup = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      amount: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
    });
  }

  ngOnInit(): void {
    this.store.select('darkMode').subscribe((data) => {
      this.darkMode = data.darkMode;
    });

    const token = this.tokenService.getTokenFromLocalStorage() as string;

    this.store.select('user').subscribe((data) => {
      this.role = data.role;
      this.userId = data._id;
    });

    this.id = this.route.snapshot.paramMap.get('id') as string;

    const parentRoute = this.route.parent as ActivatedRoute;
    this.patientId = parentRoute.snapshot.paramMap.get('id') as string;

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
    if (this.formGroup.valid) {
      const token = this.tokenService.getTokenFromLocalStorage() as string;
      this.mealService
        .createMealInMealGroup(
          {
            name: this.formGroup.value.name,
            amount: this.formGroup.value.amount,
            mealGroupId: this.id,
          },
          token
        )
        .subscribe((data) => {
          this.data.meals.push(data);
          this.formGroup.reset();
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
        this.socket.sendReload(this.userId, this.patientId);

        this.router.navigate(['/details/' + this.patientId + '/meal-groups']);
      });
  }
}
