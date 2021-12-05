import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  sideBarOpen: boolean;
  constructor() {
    this.sideBarOpen = false;
  }

  toggleNav(value: boolean) {
    this.sideBarOpen = value;
  }

  ngOnInit(): void {}
}
