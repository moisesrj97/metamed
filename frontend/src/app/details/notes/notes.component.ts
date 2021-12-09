import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  UserStore,
  PatientModel,
  NoteModel,
  RefDataModel,
  ProfessionalModel,
} from 'src/app/models/interfaces';
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
  role!: string;

  constructor(
    public route: ActivatedRoute,
    public store: Store<{ user: UserStore }>,
    public noteService: NoteService,
    public tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.id = this.route.parent?.snapshot.paramMap.get('id') as string;
    const token = this.tokenService.getTokenFromLocalStorage() as string;

    const processData = () => {
      this.data?.forEach((group) => {
        this.noteService.getNote(group, token).subscribe((data) => {
          this.fetchedData.push(data);
        });
      });
    };

    this.store
      .select((state) => state.user)
      .subscribe((user) => {
        if (user.role === 'Professional') {
          const result = user.patients?.find(
            (patient) => patient.refData._id === this.id
          ) as PatientModel;

          this.role = 'Professional';

          this.data = result?.notes;

          processData();
        } else {
          const result = user.professionals?.find(
            (professional) => professional.refData._id === this.id
          ) as ProfessionalModel;

          this.role = 'Patient';

          this.data = result?.notes;

          processData();
        }
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
