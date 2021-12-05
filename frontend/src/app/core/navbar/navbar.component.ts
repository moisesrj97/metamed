import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  loggedIn: boolean;
  @Output() toggleNav: EventEmitter<boolean>;
  constructor(private tokenService: TokenService) {
    this.loggedIn = false;
    this.toggleNav = new EventEmitter<boolean>();
  }

  openNav() {
    this.toggleNav.next(true);
  }

  ngOnInit(): void {
    if (this.tokenService.getTokenFromLocalStorage()) {
      this.loggedIn = true;
    }
  }
}
