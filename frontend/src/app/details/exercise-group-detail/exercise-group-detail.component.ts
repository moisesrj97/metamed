import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { fileChecker } from 'src/app/helpers/fileChecker.helper';
import {
  ExerciseGroupModel,
  ExerciseModel,
  UserStore,
} from 'src/app/models/interfaces';
import { ExerciseService } from 'src/app/services/exercise/exercise.service';
import { ExerciseGroupService } from 'src/app/services/exerciseGroup/exercise-group.service';
import { deleteExerciseGroup } from 'src/app/services/store/actions/exerciseGroup.actions';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-exercise-group-detail',
  templateUrl: './exercise-group-detail.component.html',
  styleUrls: ['./exercise-group-detail.component.scss'],
})
export class ExerciseGroupDetailComponent implements OnInit {
  id!: string;
  patientId!: string;
  data!: ExerciseGroupModel;
  editing: boolean = false;
  fileError: boolean = false;
  imageSrc: any;
  timestamp!: number;
  role!: string;
  formGroup!: FormGroup;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public exerciseGroupService: ExerciseGroupService,
    public exerciseService: ExerciseService,
    public tokenService: TokenService,
    public store: Store<{ user: UserStore }>,
    public fb: FormBuilder
  ) {
    this.formGroup = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      amount: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
    });
  }

  ngOnInit(): void {
    const token = this.tokenService.getTokenFromLocalStorage() as string;
    this.timestamp = new Date().getTime();

    this.id = this.route.snapshot.paramMap.get('id') as string;
    this.patientId = this.route.parent?.snapshot.paramMap.get('id') as string;

    this.store.select('user').subscribe((data) => {
      this.role = data.role;
    });

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
      this.formGroup.valid &&
      this.imageSrc
      /* this.newExercise.name &&
      this.newExercise.amount &&
      this.imageSrc */
    ) {
      const token = this.tokenService.getTokenFromLocalStorage() as string;
      this.exerciseService
        .createExerciseInExerciseGroup(
          {
            name: this.formGroup.value.name,
            amount: this.formGroup.value.amount,
            exerciseImage: this.imageSrc,
            exerciseGroupId: this.id,
          },
          token
        )
        .subscribe((data) => {
          this.data.exercises.push(data);
          this.formGroup.reset();
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

  fileChecker = fileChecker;

  editExercise(event: Event, exerciseId: string, field: string) {
    this.fileChecker(this, event);

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

        const updateExercise = (data: ExerciseModel) => {
          this.data.exercises = this.data.exercises.map((exercise) => {
            if (exercise._id === exerciseId) {
              return data;
            }
            return exercise;
          });
        };

        switch (field) {
          case 'exerciseImage':
            exerciseDto.exerciseImage = this.imageSrc;
            return this.exerciseService
              .updateExerciseInfo(exerciseId, { ...exerciseDto }, token)
              .subscribe((data) => {
                updateExercise(data);
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
                updateExercise(data);
                this.fileError = false;
              });
          default:
            return undefined;
        }
      } else {
        return undefined;
      }
    }, 100);
  }

  deleteExerciseGroup() {
    const token = this.tokenService.getTokenFromLocalStorage() as string;
    this.exerciseGroupService
      .deleteExerciseGroup(this.id, this.patientId, token)
      .subscribe(() => {
        this.store.dispatch(
          deleteExerciseGroup({
            exerciseGroupId: this.id,
            patientId: this.patientId,
          })
        );
        this.router.navigate([
          '/details/' + this.patientId + '/exercise-groups',
        ]);
      });
  }
}
