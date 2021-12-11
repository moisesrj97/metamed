import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { listenForGroupReloads } from 'src/app/helpers/listenForGroupReloads';
import {
  MealGroupModel,
  PatientModel,
  ProfessionalModel,
  RefDataModel,
  UserStore,
} from 'src/app/models/interfaces';
import { MealGroupService } from 'src/app/services/mealGroup/meal-group.service';
import { addMealGroup } from 'src/app/services/store/actions/mealGroup.action';
import { TokenService } from 'src/app/services/token/token.service';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';

@Component({
  selector: 'app-meal-groups',
  templateUrl: './meal-groups.component.html',
  styleUrls: ['./meal-groups.component.scss'],
})
export class MealGroupsComponent implements OnInit {
  id!: string;
  data: string[] = [];
  fetchedData: MealGroupModel[] = [];
  input: string = '';
  role!: string;
  darkMode!: boolean;
  professionalId!: string;

  constructor(
    public route: ActivatedRoute,
    public store: Store<{ user: UserStore; darkMode: { darkMode: boolean } }>,
    public mealGroupService: MealGroupService,
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
        this.mealGroupService.getMealGroup(group, token).subscribe((data) => {
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

          this.data = result.mealGroups;

          processData();
        } else if (user.role === 'Patient' && user.professionals) {
          const result = user.professionals.find(
            (professional) => professional.refData._id === this.id
          ) as ProfessionalModel;

          this.role = 'Patient';

          this.data = result.mealGroups;

          processData();

          listenForGroupReloads(this);
        }
      });
  }

  addGroup() {
    const token = this.tokenService.getTokenFromLocalStorage() as string;

    if (this.input.length > 0) {
      this.mealGroupService
        .addMealGroupToPatient(this.id, this.input, token)
        .subscribe((data) => {
          if (data.patients) {
            const patient = data.patients.find(
              (p) => p.refData === (this.id as unknown as RefDataModel)
            ) as PatientModel;

            const newGroupId = patient.mealGroups.find(
              (group) => ![...this.data].includes(group)
            ) as string;

            this.fetchedData = [];

            this.store.dispatch(
              addMealGroup({
                mealGroupId: newGroupId,
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
