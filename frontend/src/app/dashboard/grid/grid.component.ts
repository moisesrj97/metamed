import { Component, Input, OnInit } from '@angular/core';
import { PatientModel, ProfessionalModel } from 'src/app/models/interfaces';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit {
  @Input() usersDataInfo!: ProfessionalModel[] | PatientModel[];

  ngOnInit(): void {}
}
