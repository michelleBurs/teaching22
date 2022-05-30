import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthenticationService} from "../shared/authentication.service";
import {UserInfoService} from "../shared/user-info.service";
import {User} from "../shared/user";

@Component({
  selector: 'div.ts-user-profil',
  templateUrl: './user-profil.component.html',
  styles: []
})
export class UserProfilComponent implements OnInit {

  currentUser: User | undefined;

  constructor(
    private userInfoService: UserInfoService,
    public authService: AuthenticationService) {
  }

  ngOnInit(): void {
    if(this.authService.isLoggedIn()) {
      this.userInfoService.getCurrentUser(this.authService.getCurrentUserId()).subscribe(res => {
        this.currentUser = undefined;
        this.currentUser = res;
      });
    }
  }




}
