import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PatientModel, ProfessionalModel } from 'src/app/models/interfaces';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() data!: PatientModel | ProfessionalModel;
  darkMode!: boolean;
  constructor(private store: Store<{ darkMode: { darkMode: boolean } }>) {}

  ngOnInit(): void {
    this.store.select('darkMode').subscribe((data) => {
      this.darkMode = data.darkMode;
    });
  }
}
