import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  ExtraDataModel,
  PatientModel,
  RefDataModel,
  UserStore,
} from 'src/app/models/interfaces';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {
  id!: string;
  data: { refData: RefDataModel; extraData: ExtraDataModel[] } = {
    refData: { surname: '', profilePicture: '', name: '', _id: '' },
    extraData: [],
  };

  editing: boolean = false;

  key: string = '';
  value: string = '';

  constructor(
    private route: ActivatedRoute,
    private store: Store<{ user: UserStore }>
  ) {}

  ngOnInit(): void {
    this.id = this.route.parent?.snapshot.paramMap.get('id') as string;

    this.store
      .select((state) => state.user.patients)
      .subscribe((patients) => {
        const result = patients?.find(
          (patient) => patient.refData._id === this.id
        ) as PatientModel;

        this.data.refData = result?.refData;
        this.data.extraData = result?.extraData;
      });
  }

  addExtraData() {}
}
