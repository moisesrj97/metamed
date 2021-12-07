import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  UserStore,
  PatientModel,
  NoteModel,
  RefDataModel,
} from 'src/app/models/interfaces';
import { MealGroupService } from 'src/app/services/mealGroup/meal-group.service';
import { NoteService } from 'src/app/services/note/note.service';
import { addNote } from 'src/app/services/store/actions/note.actions';
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
  input: string = '';

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

  addGroup() {
    const token = this.tokenService.getTokenFromLocalStorage() as string;

    if (this.input.length > 0) {
      this.noteService
        .addNoteToPatient(this.id, this.input, token)
        .subscribe((data) => {
          const newGroupId = data.patients
            ?.find(
              (patient) =>
                patient.refData === (this.id as unknown as RefDataModel)
            )
            ?.notes.find((group) => ![...this.data].includes(group)) as string;

          this.fetchedData = [];

          this.store.dispatch(
            addNote({
              noteId: newGroupId,
              patientId: this.id,
            })
          );
        });
    }

    this.input = '';
  }
}
