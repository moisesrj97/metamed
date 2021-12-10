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
    public store: Store<{ user: UserStore; darkMode: { darkMode: boolean } }>
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
            this.closeModal.emit(false);
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
