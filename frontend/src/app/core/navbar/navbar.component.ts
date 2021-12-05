import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserStore } from 'src/app/models/interfaces';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  loggedIn: boolean;
  @Output() toggleNav: EventEmitter<boolean>;
  constructor(
    public tokenService: TokenService,
    private store: Store<{ user: UserStore }>
  ) {
    this.loggedIn = false;
    this.toggleNav = new EventEmitter<boolean>();
  }

  openNav() {
    this.toggleNav.next(true);
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
  }
}
