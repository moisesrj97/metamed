import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { listenForGroupReloads } from 'src/app/helpers/listenForGroupReloads';
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
import { WebsocketService } from 'src/app/services/websocket/websocket.service';

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
  darkMode!: boolean;
  professionalId!: string;

  constructor(
    public route: ActivatedRoute,
    public store: Store<{ user: UserStore; darkMode: { darkMode: boolean } }>,
    public noteService: NoteService,
    public tokenService: TokenService,
    public socket: WebsocketService
  ) {}

  ngOnInit(): void {
    this.store.select('darkMode').subscribe((data) => {
      this.darkMode = data.darkMode;
    });

    const parentRoute = this.route.parent as ActivatedRoute;
    this.id = parentRoute.snapshot.paramMap.get('id') as string;

    const token = this.tokenService.getTokenFromLocalStorage() as string;

    const processData = () => {
      this.data.forEach((group) => {
        this.noteService.getNote(group, token).subscribe((data) => {
          this.fetchedData.push(data);
        });
      });
    };

    this.store
      .select((state) => state.user)
      .subscribe((user) => {
        if (user.role === 'Professional' && user.patients) {
          const result = user.patients.find(
            (patient) => patient.refData._id === this.id
          ) as PatientModel;
          this.professionalId = user._id;

          this.role = 'Professional';

          this.data = result.notes;

          processData();
        } else if (user.role === 'Patient' && user.professionals) {
          const result = user.professionals.find(
            (professional) => professional.refData._id === this.id
          ) as ProfessionalModel;

          this.role = 'Patient';

          this.data = result.notes;

          processData();

          listenForGroupReloads(this);
        }
      });
  }

  addGroup() {
    const token = this.tokenService.getTokenFromLocalStorage() as string;

    if (this.input.length > 0) {
      this.noteService
        .addNoteToPatient(this.id, this.input, token)
        .subscribe((data) => {
          if (data.patients) {
            const patient = data.patients.find(
              (p) => p.refData === (this.id as unknown as RefDataModel)
            ) as PatientModel;

            const newGroupId = patient.notes.find(
              (group) => ![...this.data].includes(group)
            ) as string;

            this.fetchedData = [];

            this.store.dispatch(
              addNote({
                noteId: newGroupId,
                patientId: this.id,
              })
            );

            this.socket.sendReload(this.professionalId, this.id);
          }
        });
    }

    this.input = '';
  }
}
