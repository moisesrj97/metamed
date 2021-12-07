import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserStore, PatientModel } from 'src/app/models/interfaces';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {
  id!: string;
  data: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private store: Store<{ user: UserStore }>
  ) {}

  ngOnInit(): void {
    this.id = this.route.parent?.snapshot.paramMap.get('id') as string;

    this.store
      .select((state) => state.user.patients)
      .subscribe((patients) => {
        console.log(this.id, patients);

        const result = patients?.find(
          (patient) => patient.refData._id === this.id
        ) as PatientModel;

        console.log(result);

        this.data = result?.notes;
      });
  }
}
