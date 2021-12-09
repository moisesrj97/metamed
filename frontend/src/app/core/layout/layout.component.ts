import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  sideBarOpen: boolean;
  constructor() {
    this.sideBarOpen = false;
  }

  toggleNav(value: boolean) {
    this.sideBarOpen = value;
  }
}
