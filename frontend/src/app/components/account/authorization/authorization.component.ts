import {Component, OnInit} from '@angular/core';
import {User} from '../../../common/user';
import {AccountService} from "../../../services/account.service";

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {

  user: User;
  hide = true;
  showLoginForm = true;

  constructor(private accountService: AccountService) {
  }

  ngOnInit(): void {
    if (this.accountService.authentication) {
      this.user = this.accountService.user;
    } else {
      this.user = new User();
    }
  }

  login() {
    if (this.user.username !== null && this.user.password) {
      this.accountService.login(this.user, null);
    }
  }

  get getAuthentication() {
    return this.accountService.authentication;
  }

}
