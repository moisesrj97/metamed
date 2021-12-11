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
import { WebsocketService } from 'src/app/services/websocket/websocket.service';

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
  darkMode!: boolean;
  userId!: string;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public exerciseGroupService: ExerciseGroupService,
    public exerciseService: ExerciseService,
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
    this.timestamp = new Date().getTime();

    this.id = this.route.snapshot.paramMap.get('id') as string;

    const parentRoute = this.route.parent as ActivatedRoute;
    this.patientId = parentRoute.snapshot.paramMap.get('id') as string;

    this.store.select('user').subscribe((data) => {
      this.role = data.role;
      this.userId = data._id;
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
    if (!this.fileError && this.formGroup.valid && this.imageSrc) {
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
        this.socket.sendReload(this.userId, this.patientId);
        this.router.navigate([
          '/details/' + this.patientId + '/exercise-groups',
        ]);
      });
  }
}
