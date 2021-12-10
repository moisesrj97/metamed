import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserStore } from 'src/app/models/interfaces';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  isLoggedIn: boolean;
  darkMode!: boolean;

  constructor(
    public tokenService: TokenService,
    public store: Store<{ user: UserStore; darkMode: { darkMode: boolean } }>
  ) {
    this.isLoggedIn = false;
  }

  ngOnInit(): void {
    this.store
      .select((state) => state.user._id)
      .subscribe((id) => {
        if (id !== '') {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      });

    this.store
      .select((state) => state.darkMode.darkMode)
      .subscribe((mode) => {
        this.darkMode = mode;
      });
  }
}
