import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { UserStore } from 'src/app/models/interfaces';
import { PatientManagmentService } from 'src/app/services/patientManagment/patient-managment.service';
import { loginUser } from 'src/app/services/store/actions/user.actions';
import { TokenService } from 'src/app/services/token/token.service';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss'],
})
export class AddModalComponent implements OnInit {
  @Input() modalOpen!: boolean;
  @Output() closeModal: EventEmitter<boolean>;
  input: string = '';
  darkMode!: boolean;

  constructor(
    public patientManagmentService: PatientManagmentService,
    public tokenService: TokenService,
    public store: Store<{ user: UserStore; darkMode: { darkMode: boolean } }>,
    public socket: WebsocketService
  ) {
    this.closeModal = new EventEmitter();
  }

  ngOnInit(): void {
    this.store.select('darkMode').subscribe((mode) => {
      this.darkMode = mode.darkMode;
    });
  }

  addPatient(): void {
    let token = this.tokenService.getTokenFromLocalStorage() as string;
    this.store
      .select((state) => state.user._id)
      .subscribe((id) => {
        this.patientManagmentService
          .addPatientToList(id, this.input, token)
          .subscribe((newStore) => {
            this.store.dispatch(loginUser({ userInfo: newStore }));
            this.socket.emitPatientListModification({
              professionalId: id,
              patientId: this.input,
              mode: 'add',
            });
            this.socket.connectToRoom([id + this.input]);
            this.closeModal.emit(false);
            this.input = '';
          });
      });
  }

  @HostListener('document:click', ['$event'])
  onGlobalClick(event: any): void {
    if (
      !event.target.className.match(/modal/i) &&
      !event.target.className.match(/modal-open__button/i)
    ) {
      this.closeModal.emit(false);
    }
  }
}
