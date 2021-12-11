import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NoteModel, UserStore } from 'src/app/models/interfaces';
import { NoteService } from 'src/app/services/note/note.service';
import { deleteNote } from 'src/app/services/store/actions/note.actions';
import { TokenService } from 'src/app/services/token/token.service';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.scss'],
})
export class NoteDetailComponent implements OnInit {
  id!: string;
  patientId!: string;
  data!: NoteModel;
  editing: boolean = false;
  role!: string;
  darkMode!: boolean;
  userId!: string;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public noteService: NoteService,
    public tokenService: TokenService,
    public store: Store<{ user: UserStore; darkMode: { darkMode: boolean } }>,
    public socket: WebsocketService
  ) {}

  ngOnInit(): void {
    this.store.select('darkMode').subscribe((data) => {
      this.darkMode = data.darkMode;
    });

    const token = this.tokenService.getTokenFromLocalStorage() as string;

    this.store.select('user').subscribe((data) => {
      this.role = data.role;
      this.userId = data._id;
    });

    this.id = this.route.snapshot.paramMap.get('id') as string;

    const parentRoute = this.route.parent as ActivatedRoute;
    this.patientId = parentRoute.snapshot.paramMap.get('id') as string;

    this.noteService.getNote(this.id, token).subscribe((data) => {
      this.data = data;
    });
  }

  toggle() {
    this.editing = !this.editing;
  }

  changeTitleAndExtra() {
    const token = this.tokenService.getTokenFromLocalStorage() as string;
    this.noteService
      .updateNoteName(this.id, this.data.title, this.data.description, token)
      .subscribe();
  }

  deleteNote() {
    const token = this.tokenService.getTokenFromLocalStorage() as string;
    this.noteService
      .deleteNote(this.id, this.patientId, token)
      .subscribe(() => {
        this.store.dispatch(
          deleteNote({ noteId: this.id, patientId: this.patientId })
        );
        this.socket.sendReload(this.userId, this.patientId);

        this.router.navigate(['/details/' + this.patientId + '/notes']);
      });
  }
}
