import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  loggedIn: boolean;
  constructor(private tokenService: TokenService) {
    this.loggedIn = false;
  }

  ngOnInit(): void {
    if (this.tokenService.getTokenFromLocalStorage()) {
      this.loggedIn = true;
    }
  }
}
