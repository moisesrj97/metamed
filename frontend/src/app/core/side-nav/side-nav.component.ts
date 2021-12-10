import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { UserStore } from 'src/app/models/interfaces';
import { logoutUser } from 'src/app/services/store/actions/user.actions';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  wasInside: boolean = false;
  isRendered: boolean;
  compWindow: Window;
  darkMode!: boolean;

  menuItems: {
    imagePath: string;
    label: string;
    route: string;
    match: boolean;
  }[];
  @Input() open!: boolean;
  @Output() toggleNav: EventEmitter<boolean>;

  constructor(
    public tokenService: TokenService,
    public store: Store<{ user: UserStore; darkMode: { darkMode: boolean } }>
  ) {
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
    this.compWindow = window;
  }

  closeNav() {
    this.toggleNav.next(false);
  }

  logout() {
    this.tokenService.deleteTokenFromLocalStorage();
    this.store.dispatch(logoutUser());
    this.compWindow.location.reload();
  }

  ngOnInit(): void {
    this.store
      .select((state) => state.user._id)
      .subscribe((id) => {
        if (id !== '') {
          this.isRendered = true;
        }
      });
    this.store
      .select((state) => state.user)
      .subscribe((user) => {
        const otherUsers =
          user.role === 'Professional' ? 'patients' : 'professionals';
        if (
          user[otherUsers]?.some((otherUser) =>
            otherUser.chatRef.messages.some(
              (message) => message.read === false && message.to === user._id
            )
          )
        ) {
          this.menuItems[2].imagePath = this.darkMode
            ? '../../../assets/images/messagesNotificationDark.png'
            : '../../../assets/images/messagesNotification.png';
        } else {
          this.menuItems[2].imagePath = this.darkMode
            ? '../../../assets/images/messagesDark.png'
            : '../../../assets/images/messages.png';
        }
      });

    this.store
      .select((state) => state.user.role)
      .subscribe((role) => {
        this.menuItems[1].label =
          role === 'Patient' ? 'My professionals' : 'My patients';
      });

    this.store
      .select((state) => state.darkMode.darkMode)
      .subscribe((mode) => {
        this.darkMode = mode;
        this.menuItems.forEach((item, index) => {
          if (mode) {
            this.menuItems[index].imagePath = this.menuItems[
              index
            ].imagePath.replace('.png', 'Dark.png');
          } else {
            this.menuItems[index].imagePath = this.menuItems[
              index
            ].imagePath.replace('Dark.png', '.png');
          }
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
