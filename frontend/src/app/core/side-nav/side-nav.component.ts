import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  open: boolean;
  menuItems: {
    imagePath: string;
    label: string;
    route: string;
    match: boolean;
  }[];

  constructor(private router: Router) {
    this.open = true;
    this.menuItems = [
      {
        imagePath: '../../../assets/images/user.png',
        label: 'My info',
        route: 'profile',
        match: false,
      },
      {
        imagePath: '../../../assets/images/userGroup.png',
        label: 'My patients',
        route: 'dashboard',
        match: false,
      },
      {
        imagePath: '../../../assets/images/messagesNotification.png',
        label: 'My messages',
        route: 'inbox',
        match: false,
      },
    ];
  }

  ngOnInit(): void {
    console.log(window.location.pathname.substring(1));
    this.router.events.subscribe(() => {
      this.menuItems.forEach((item) => {
        item.match = item.route === window.location.pathname.substring(1);
      });
    });
  }
}
