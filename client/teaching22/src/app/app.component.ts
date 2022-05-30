import {Component} from '@angular/core';

declare var $: any;

import {AuthenticationService} from "./shared/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'ts-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {

  constructor(public authService: AuthenticationService,
              private router: Router
  ) {
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl("/");
    this.dimmer();
  }


  dimmer(): void {
    let dimmer = "  <div class='content'>" +
      "<img src='assets/login-illu.svg' class='ui image small centered'>" +
      "<h2>You are logged out now.</h2>" +
      "<p>just click somewhere</p>" +
      "</div>";
    $('.ui.dimmer.log .content').remove();
    $('.ui.dimmer.log').dimmer('add content', dimmer);
    $('.ui.dimmer.log').dimmer('show');
  }
}
