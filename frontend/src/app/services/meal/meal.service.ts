import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface CreateMealDto {
  name: string;
  amount: string;
  mealGroupId: string;
}

export interface UpdateMealDto {
  name: string;
  amount: string;
}

@Injectable({
  providedIn: 'root',
})
export class MealService {
  baseUrl: string = 'http://localhost:3000/meal';
  constructor(private httpClient: HttpClient) {}

  createMealInMealGroup(meal: CreateMealDto, token: string) {
    return this.httpClient.post(
      this.baseUrl,
      {
        name: meal.name,
        amount: meal.amount,
        mealGroupId: meal.mealGroupId,
      },
      {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
      }
    );
  }

  updateMealInfo(mealId: string, meal: UpdateMealDto, token: string) {
    return this.httpClient.patch(
      `${this.baseUrl}/${mealId}`,
      {
        name: meal.name,
        amount: meal.amount,
      },
      {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
      }
    );
  }

  deleteMealFromGroup(mealId: string, mealGroupId: string, token: string) {
    return this.httpClient.delete(`${this.baseUrl}/${mealId}/${mealGroupId}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
    });
  }
}
