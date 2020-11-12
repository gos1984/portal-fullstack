import {Component, OnInit} from '@angular/core';
import {AccountService} from "../../../services/account.service";
import {User} from "../../../common/user";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User;
  edit = false;

  constructor(private accountService: AccountService) {
    this.accountService.verification();
  }

  ngOnInit(): void {
    if (this.accountService.authentication) {
      this.accountService.getUser().subscribe(response => {
        this.user = new User();
        this.user.setUser(
          response.id,
          response.username,
          response.firstName,
          response.lastName,
          response.position,
          response.phone,
          response.email,
          response.authorities);
      });
    }
  }

  update() {

  }

  editToggle() {
    this.edit = !this.edit;
  }
}
