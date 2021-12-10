import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { fileChecker } from '../helpers/fileChecker.helper';
import { UserStore } from '../models/interfaces';
import { updateUserBasicData } from '../services/store/actions/user.actions';
import { TokenService } from '../services/token/token.service';
import { UserInfoService } from '../services/userInfo/user-info.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  editing: boolean = false;
  data!: UserStore;
  timestamp!: number;
  fileError: boolean = false;
  imageSrc: any = null;
  darkMode!: boolean;

  constructor(
    public store: Store<{ user: UserStore; darkMode: { darkMode: boolean } }>,
    public userInfoService: UserInfoService,
    public tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.timestamp = Date.now();

    this.store.select('darkMode').subscribe((data) => {
      this.darkMode = data.darkMode;
    });

    this.store
      .select((user) => user.user)
      .subscribe((user) => {
        this.data = { ...user };
      });
  }

  toggleEditing() {
    this.editing = !this.editing;
    this.timestamp = new Date().getTime();
  }

  fileChecker = fileChecker;

  edit(event: Event) {
    const token = this.tokenService.getTokenFromLocalStorage() as string;
    const target = event.target as HTMLInputElement;

    if (target.name === 'profilePicture') {
      this.fileChecker(this, event);
    }

    if (!this.fileError) {
      setTimeout(() => {
        const dto = {
          name: this.data.name,
          profilePicture: this.data.profilePicture,
          surname: this.data.surname,
          file: this.imageSrc,
          businessName: this.data.businessName,
          gender: this.data.gender,
          birthDate: this.data.birthDate,
        };

        const updateData = (data: UserStore) => {
          this.store.dispatch(updateUserBasicData({ fullDataUpdated: data }));
        };

        if (target.name === 'profilePicture') {
          this.userInfoService
            .update(this.data._id, this.data.role, dto, token)
            .subscribe((data) => {
              updateData(data);
            });
        } else {
          this.userInfoService
            .update(
              this.data._id,
              this.data.role,
              { ...dto, [target.name]: target.value },
              token
            )
            .subscribe((data) => {
              updateData(data);
            });
        }
      }, 100);
    }
  }
}
