import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

  createExerciseInExerciseGroup(exercise: CreateExerciseDto, token: string) {
    const multipartFormData = new FormData();
    multipartFormData.set('name', exercise.name);
    multipartFormData.set('amount', exercise.amount);
    multipartFormData.set('exerciseGroupId', exercise.exerciseGroupId);
    multipartFormData.append('exerciseImage', exercise.exerciseImage, 'image');

    return this.httpClient.post(this.baseUrl, multipartFormData, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
    });
  }

  updateExerciseInfo(
    exerciseId: string,
    exercise: UpdateExerciseDto,
    token: string
  ) {
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
    );
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
