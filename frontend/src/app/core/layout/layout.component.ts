import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  sideBarOpen: boolean;
  darkMode!: boolean;
  constructor(private store: Store<{ darkMode: { darkMode: boolean } }>) {
    this.sideBarOpen = false;
  }

  ngOnInit(): void {
    this.store.select('darkMode').subscribe((data) => {
      this.darkMode = data.darkMode;
    });
  }

  toggleNav(value: boolean) {
    this.sideBarOpen = value;
  }
}
