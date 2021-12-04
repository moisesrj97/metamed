import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface CreateExerciseDto {
  name: string;
  amount: string;
  exerciseGroupId: string;
  exerciseImage: File;
}

export interface UpdateExerciseDto {
  name: string;
  amount: string;
  imageUrl: string;
  exerciseImage?: File;
}

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  baseUrl: string = 'http://localhost:3000/exercise';
  constructor(private httpClient: HttpClient) {}

  createExerciseInExerciseGroup(exercise: CreateExerciseDto, token: string) {
    return this.httpClient.post(
      this.baseUrl,
      {
        name: exercise.name,
        amount: exercise.amount,
        exerciseImage: exercise.exerciseImage,
        exerciseGroupId: exercise.exerciseGroupId,
      },
      {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
      }
    );
  }

  updateExerciseInfo(
    exerciseId: string,
    exercise: UpdateExerciseDto,
    token: string
  ) {
    return this.httpClient.patch(
      `${this.baseUrl}/${exerciseId}`,
      {
        name: exercise.name,
        amount: exercise.amount,
        exerciseImage: exercise.exerciseImage,
        imageUrl: exercise.imageUrl,
      },
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
