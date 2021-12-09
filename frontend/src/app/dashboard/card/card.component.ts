import { Component, Input } from '@angular/core';
import { PatientModel, ProfessionalModel } from 'src/app/models/interfaces';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() data!: PatientModel | ProfessionalModel;
}
