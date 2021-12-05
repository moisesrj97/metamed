import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  isLoggedIn: boolean;
  constructor(public tokenService: TokenService) {
    this.isLoggedIn = false;
  }
  ngOnInit(): void {
    if (this.tokenService.getTokenFromLocalStorage()) {
      this.isLoggedIn = true;
    }
  }
}
