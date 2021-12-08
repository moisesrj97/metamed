import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExerciseGroupModel, ExerciseModel } from 'src/app/models/interfaces';
import { ExerciseService } from 'src/app/services/exercise/exercise.service';
import { ExerciseGroupService } from 'src/app/services/exerciseGroup/exercise-group.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-exercise-group-detail',
  templateUrl: './exercise-group-detail.component.html',
  styleUrls: ['./exercise-group-detail.component.scss'],
})
export class ExerciseGroupDetailComponent implements OnInit {
  id!: string;
  data!: ExerciseGroupModel;
  editing: boolean = false;
  newExercise: { name: string; amount: string; image: string } = {
    name: '',
    amount: '',
    image: '',
  };
  fileError: boolean = false;
  imageSrc: any;
  timestamp!: number;

  constructor(
    public route: ActivatedRoute,
    public exerciseGroupService: ExerciseGroupService,
    public exerciseService: ExerciseService,
    public tokenService: TokenService
  ) {}

  ngOnInit(): void {
    const token = this.tokenService.getTokenFromLocalStorage() as string;
    this.timestamp = new Date().getTime();

    this.id = this.route.snapshot.paramMap.get('id') as string;
    this.exerciseGroupService
      .getExerciseGroup(this.id, token)
      .subscribe((data) => {
        this.data = data;
      });
  }

  toggle() {
    this.timestamp = new Date().getTime();
    this.editing = !this.editing;
  }

  changeTitle() {
    const token = this.tokenService.getTokenFromLocalStorage() as string;
    this.exerciseGroupService
      .updateExerciseGroupName(this.id, token, this.data.name)
      .subscribe();
  }

  changeExtra() {
    const token = this.tokenService.getTokenFromLocalStorage() as string;
    this.exerciseGroupService
      .updateExerciseGroupName(this.id, token, undefined, this.data.extra)
      .subscribe();
  }

  addExercise() {
    if (
      !this.fileError &&
      this.newExercise.name &&
      this.newExercise.amount &&
      this.imageSrc
    ) {
      const token = this.tokenService.getTokenFromLocalStorage() as string;
      this.exerciseService
        .createExerciseInExerciseGroup(
          {
            name: this.newExercise.name,
            amount: this.newExercise.amount,
            exerciseImage: this.imageSrc,
            exerciseGroupId: this.id,
          },
          token
        )
        .subscribe((data) => {
          this.data.exercises.push(data);
          this.newExercise.name = '';
          this.newExercise.amount = '';
          this.imageSrc = undefined;
        });
    }
  }

  deleteExercise(id: string) {
    const token = this.tokenService.getTokenFromLocalStorage() as string;
    this.exerciseService
      .deleteExerciseFromGroup(id, this.id, token)
      .subscribe(() => {
        this.data.exercises = this.data.exercises.filter(
          (exercise) => exercise._id !== id
        );
      });
  }

  async editExercise(event: Event, exerciseId: string, field: string) {
    await this.fileChecker(event);

    setTimeout(() => {
      if (!this.fileError) {
        const token = this.tokenService.getTokenFromLocalStorage() as string;
        const target = event.target as HTMLInputElement;

        const exerciseToModify = this.data.exercises.find(
          (exercise) => exercise._id === exerciseId
        ) as ExerciseModel;

        const exerciseDto = {
          name: exerciseToModify.name,
          amount: exerciseToModify.amount,
          imageUrl: exerciseToModify.image,
          exerciseImage: this.imageSrc,
        };

        switch (field) {
          case 'exerciseImage':
            exerciseDto.exerciseImage = this.imageSrc;
            return this.exerciseService
              .updateExerciseInfo(exerciseId, { ...exerciseDto }, token)
              .subscribe((data) => {
                this.data.exercises = this.data.exercises.map((exercise) => {
                  if (exercise._id === exerciseId) {
                    return data;
                  }
                  return exercise;
                });
                this.fileError = false;
                this.imageSrc = undefined;
              });
          case 'name':
          case 'amount':
            return this.exerciseService
              .updateExerciseInfo(
                exerciseId,
                { ...exerciseDto, [target.name]: target.value },
                token
              )
              .subscribe((data) => {
                this.data.exercises = this.data.exercises.map((exercise) => {
                  if (exercise._id === exerciseId) {
                    return data;
                  }
                  return exercise;
                });
                this.fileError = false;
              });
          default:
            throw new Error('Field not found');
        }
      } else {
        throw new Error('File error');
      }
    }, 100);
  }

  async fileChecker(fileEvent: any) {
    const file = fileEvent.target.files[0];
    if (
      !['image/jpeg', 'image/png'].includes(file.type) ||
      file.size > 10000000
    ) {
      this.fileError = true;
    } else {
      this.fileError = false;
    }

    const reader = new FileReader();

    if (fileEvent.target.files && fileEvent.target.files.length) {
      const [file] = fileEvent.target.files;

      reader.onload = () => {
        this.imageSrc = file;
      };

      await reader.readAsDataURL(file);
    }
  }
}
