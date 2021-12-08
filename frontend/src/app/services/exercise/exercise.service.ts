import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExerciseModel } from 'src/app/models/interfaces';

export interface CreateExerciseDto {
  name: string;
  amount: string;
  exerciseGroupId: string;
  exerciseImage: string;
}

export interface UpdateExerciseDto {
  name: string;
  amount: string;
  imageUrl: string;
  exerciseImage?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  baseUrl: string = 'http://localhost:3000/exercise';
  constructor(private httpClient: HttpClient) {}

  createExerciseInExerciseGroup(
    exercise: CreateExerciseDto,
    token: string
  ): Observable<ExerciseModel> {
    const multipartFormData = new FormData();
    multipartFormData.set('name', exercise.name);
    multipartFormData.set('amount', exercise.amount);
    multipartFormData.set('exerciseGroupId', exercise.exerciseGroupId);
    multipartFormData.append('exerciseImage', exercise.exerciseImage, 'image');

    return this.httpClient.post(this.baseUrl, multipartFormData, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
    }) as Observable<ExerciseModel>;
  }

  updateExerciseInfo(
    exerciseId: string,
    exercise: UpdateExerciseDto,
    token: string
  ): Observable<ExerciseModel> {
    const multipartFormData = new FormData();
    multipartFormData.set('name', exercise.name);
    multipartFormData.set('amount', exercise.amount);
    multipartFormData.set('imageUrl', exercise.imageUrl);
    if (exercise.exerciseImage) {
      multipartFormData.append(
        'exerciseImage',
        exercise.exerciseImage,
        'image'
      );
    }

    return this.httpClient.patch(
      `${this.baseUrl}/${exerciseId}`,
      multipartFormData,
      {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
      }
    ) as Observable<ExerciseModel>;
  }

  deleteExerciseFromGroup(
    exerciseId: string,
    exerciseGroupId: string,
    token: string
  ) {
    return this.httpClient.delete(
      `${this.baseUrl}/${exerciseId}/${exerciseGroupId}`,
      {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
      }
    );
  }
}
