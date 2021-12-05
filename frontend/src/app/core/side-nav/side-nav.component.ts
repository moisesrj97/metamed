import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  wasInside: boolean = false;
  isRendered: boolean;

  menuItems: {
    imagePath: string;
    label: string;
    route: string;
    match: boolean;
  }[];
  @Input() open!: boolean;
  @Output() toggleNav: EventEmitter<boolean>;

  constructor(public router: Router, private tokenService: TokenService) {
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
    this.isRendered = false;
  }

  closeNav() {
    this.toggleNav.next(false);
  }

  ngOnInit(): void {
    if (this.tokenService.getTokenFromLocalStorage()) {
      this.isRendered = true;
    }
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
