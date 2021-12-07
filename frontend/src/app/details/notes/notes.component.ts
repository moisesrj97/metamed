import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserStore, PatientModel, NoteModel } from 'src/app/models/interfaces';
import { MealGroupService } from 'src/app/services/mealGroup/meal-group.service';
import { NoteService } from 'src/app/services/note/note.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {
  id!: string;
  data: string[] = [];
  fetchedData: NoteModel[] = [];

  constructor(
    private route: ActivatedRoute,
    private store: Store<{ user: UserStore }>,
    public noteService: NoteService,
    public tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.id = this.route.parent?.snapshot.paramMap.get('id') as string;
    const token = this.tokenService.getTokenFromLocalStorage() as string;

    this.store
      .select((state) => state.user.patients)
      .subscribe((patients) => {
        const result = patients?.find(
          (patient) => patient.refData._id === this.id
        ) as PatientModel;

        this.data = result?.notes;

        this.data?.forEach((group) => {
          this.noteService.getNote(group, token).subscribe((data) => {
            this.fetchedData.push(data);
          });
        });
      });
  }
}
