import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
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

  constructor(
    public store: Store<{ user: UserStore }>,
    public userInfoService: UserInfoService,
    public tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.timestamp = Date.now();

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

  edit(event: Event) {
    const token = this.tokenService.getTokenFromLocalStorage() as string;
    const target = event.target as HTMLInputElement;

    if (target.name === 'profilePicture') {
      this.fileChecker(event);
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

        if (target.name === 'profilePicture') {
          this.userInfoService
            .update(this.data._id, this.data.role, dto, token)
            .subscribe((data) => {
              this.store.dispatch(
                updateUserBasicData({ fullDataUpdated: data })
              );
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
              this.store.dispatch(
                updateUserBasicData({ fullDataUpdated: data })
              );
            });
        }
      }, 100);
    }
  }

  fileChecker(fileEvent: any) {
    const reader = new FileReader();

    if (fileEvent.target.files && fileEvent.target.files.length) {
      const [file] = fileEvent.target.files;

      if (
        !['image/jpeg', 'image/png'].includes(file.type) ||
        file.size > 10000000
      ) {
        this.fileError = true;
      } else {
        this.fileError = false;
      }

      reader.onload = () => {
        this.imageSrc = file;
      };

      reader.readAsDataURL(file);
    }
  }
}
