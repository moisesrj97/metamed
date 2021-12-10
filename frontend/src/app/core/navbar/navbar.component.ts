import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserStore } from 'src/app/models/interfaces';
import { toggleDarkMode } from 'src/app/services/store/actions/darkMode.actions';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  loggedIn: boolean;
  darkMode!: boolean;
  @Output() toggleNav: EventEmitter<boolean>;
  constructor(
    public tokenService: TokenService,
    public store: Store<{ user: UserStore; darkMode: { darkMode: boolean } }>
  ) {
    this.loggedIn = false;
    this.toggleNav = new EventEmitter<boolean>();
  }

  openNav() {
    this.toggleNav.next(true);
  }

  toggleDarkMode() {
    this.store.dispatch(toggleDarkMode());
  }

  ngOnInit(): void {
    this.store
      .select((state) => state.user._id)
      .subscribe((id) => {
        if (id !== '') {
          this.loggedIn = true;
        } else {
          this.loggedIn = false;
        }
      });

    this.store
      .select((state) => state.darkMode.darkMode)
      .subscribe((mode) => {
        this.darkMode = mode;
      });
  }
}
