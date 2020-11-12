import {Component, EventEmitter, Output} from '@angular/core';
import {AccountService} from '../../services/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output()
  sidenavToggle = new EventEmitter<boolean>();

  constructor(private accountService: AccountService) {
  }

  logout() {
    this.accountService.logout();
  }

  get getAuthentication() {
    return this.accountService.authentication;
  }

  toggleSidenav() {
    this.sidenavToggle.emit();
  }
}
