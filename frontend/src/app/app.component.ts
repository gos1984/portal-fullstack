import {Component} from '@angular/core';
import {AccountService} from "./services/account.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  sidenav = false;

  constructor(private accountService: AccountService) {
  }

  get getAuthentication() {
    return this.accountService.authentication;
  }

  sidenavToggle($event) {
    this.sidenav = !this.sidenav;
  }
}
