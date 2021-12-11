import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  ExtraDataModel,
  PatientModel,
  RefDataModel,
  UserStore,
} from 'src/app/models/interfaces';
import { PatientManagmentService } from 'src/app/services/patientManagment/patient-managment.service';
import {
  deleteUserFromProfessional,
  updatePatientExtraDataFromProfessional,
} from 'src/app/services/store/actions/user.actions';
import { TokenService } from 'src/app/services/token/token.service';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {
  id!: string;
  professionalId!: string;
  data: { refData: RefDataModel; extraData: ExtraDataModel[] } = {
    refData: { surname: '', profilePicture: '', name: '', _id: '' },
    extraData: [],
  };

  editing: boolean = false;

  key: string = '';
  value: string = '';
  darkMode!: boolean;

  constructor(
    public route: ActivatedRoute,
    private router: Router,
    private store: Store<{ user: UserStore; darkMode: { darkMode: boolean } }>,
    public patientManageService: PatientManagmentService,
    public tokenService: TokenService,
    public socket: WebsocketService
  ) {}

  ngOnInit(): void {
    this.store.select('darkMode').subscribe((state) => {
      this.darkMode = state.darkMode;
    });

    const parentRoute = this.route.parent as ActivatedRoute;
    this.id = parentRoute.snapshot.paramMap.get('id') as string;

    this.store
      .select((state) => state.user._id)
      .subscribe((userId) => {
        this.professionalId = userId;
      });

    this.store
      .select((state) => state.user.patients)
      .subscribe((patients) => {
        if (patients) {
          const result = patients.find(
            (patient) => patient.refData._id === this.id
          ) as PatientModel;
          this.data.refData = result.refData;
          this.data.extraData = result.extraData;
        }
      });
  }

  updateStoreExtraData = (updatedExtraData: ExtraDataModel[]) => {
    this.store.dispatch(
      updatePatientExtraDataFromProfessional({
        patientId: this.id,
        fullExtraDataUpdated: updatedExtraData,
      })
    );
  };

  addExtraData() {
    const token = this.tokenService.getTokenFromLocalStorage() as string;

    const updatedExtraData = [
      ...this.data.extraData,
      { key: this.key, value: this.value },
    ];
    this.patientManageService
      .updateExtraDataFromPatient(
        this.professionalId,
        this.id,
        updatedExtraData,
        token
      )
      .subscribe(() => this.updateStoreExtraData(updatedExtraData));
    this.key = '';
    this.value = '';
  }

  deleteExtraData(index: number) {
    const token = this.tokenService.getTokenFromLocalStorage() as string;

    const updatedExtraData = [...this.data.extraData];
    updatedExtraData.splice(index, 1);

    this.patientManageService
      .updateExtraDataFromPatient(
        this.professionalId,
        this.id,
        updatedExtraData,
        token
      )
      .subscribe(() => this.updateStoreExtraData(updatedExtraData));
  }

  deletePatient() {
    const token = this.tokenService.getTokenFromLocalStorage() as string;

    this.patientManageService
      .removePatientFromList(this.professionalId, this.id, token)
      .subscribe((newState) => {
        this.store.dispatch(deleteUserFromProfessional({ patientId: this.id }));
        this.socket.emitPatientListModification({
          professionalId: this.professionalId,
          patientId: this.id,
          mode: 'delete',
        });
        this.router.navigate(['/dashboard']);
      });
  }
}
