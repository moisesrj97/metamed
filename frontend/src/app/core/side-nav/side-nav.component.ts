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
    public store: Store<{ user: UserStore }>
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
        console.log(id);
        if (id !== '') {
          this.isRendered = true;
        }
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
