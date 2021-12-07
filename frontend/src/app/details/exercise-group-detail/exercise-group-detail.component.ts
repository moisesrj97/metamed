import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExerciseGroupModel } from 'src/app/models/interfaces';
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

  constructor(
    public route: ActivatedRoute,
    public exerciseGroupService: ExerciseGroupService,
    public exerciseService: ExerciseService,
    public tokenService: TokenService
  ) {}

  ngOnInit(): void {
    const token = this.tokenService.getTokenFromLocalStorage() as string;

    this.id = this.route.snapshot.paramMap.get('id') as string;
    this.exerciseGroupService
      .getExerciseGroup(this.id, token)
      .subscribe((data) => {
        this.data = data;
      });
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
    if (!this.fileError && this.newExercise.name && this.newExercise.amount) {
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
          this.imageSrc = null;
        });
    }
  }

  fileChecker(fileEvent: any) {
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
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageSrc = file;
      };
    }
  }
}
