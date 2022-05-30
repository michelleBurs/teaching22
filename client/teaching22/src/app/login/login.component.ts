import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthenticationService} from "../shared/authentication.service";
import {User} from "../shared/user";
import {UserInfoService} from "../shared/user-info.service";

declare var $: any;


interface Response {
  access_token: string;
}

@Component({
  selector: "ts-login",
  templateUrl: "./login.component.html"
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  currentUser: User | undefined;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
    private userInfoService: UserInfoService
  ) {
    this.loginForm = this.fb.group({});
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
    });
  }

  login() {
    const val = this.loginForm.value;
    if (val.email && val.password) {
      this.authService.login(val.email, val.password).subscribe((res: any) => {
        this.authService.setSessionStorage((res as Response).access_token);
        this.router.navigateByUrl("/");
        if(this.authService.isLoggedIn()) {
          this.userInfoService.getCurrentUser(this.authService.getCurrentUserId()).subscribe(res => {
            this.currentUser = res;
            this.dimmer();
          })
        }
      });

    }
  }

  dimmer(): void {
    let dimmer = "<div class='content'>" +
      "<img src='assets/login-illu.svg' class='ui image small centered'>" +
      "<h2>Hello " + this.currentUser?.firstName + ",<br> you are logged in now.</h2>" +
      "<p>just click somewhere</p>" +
      "</div>";
    $('.ui.dimmer.log .content:first').remove();
    $('.ui.dimmer.log').dimmer('add content', dimmer);
    $('.ui.dimmer.log').dimmer('show');
  };
}
