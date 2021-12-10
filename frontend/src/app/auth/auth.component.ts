import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  darkMode!: boolean;
  constructor(private store: Store<{ darkMode: { darkMode: boolean } }>) {}

  ngOnInit(): void {
    this.store.select('darkMode').subscribe((data) => {
      this.darkMode = data.darkMode;
    });
  }
}
