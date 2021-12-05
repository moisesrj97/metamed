import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  wasInside = false;

  menuItems: {
    imagePath: string;
    label: string;
    route: string;
    match: boolean;
  }[];
  @Input() open!: boolean;
  @Output() toggleNav: EventEmitter<boolean>;

  constructor(private router: Router) {
    this.toggleNav = new EventEmitter<boolean>();
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

  closeNav() {
    this.toggleNav.next(false);
  }

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.menuItems.forEach((item) => {
        item.match = item.route === window.location.pathname.substring(1);
      });
    });
  }

  @HostListener('document:click', ['$event'])
  onGlobalClick(event: any): void {
    if (
      !event.target.className.match(/side-nav/i) &&
      !event.target.className.match(/toggle/i)
    ) {
      this.closeNav();
    }
  }
}
