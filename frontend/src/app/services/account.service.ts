import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from "@angular/router";
import {User} from "../common/user";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private url = 'http://localhost:8080';
  authentication: boolean;
  user: User;

  constructor(private httpClient: HttpClient, private router: Router) {
    if (sessionStorage.getItem('token') !== null) {
      this.authentication = true;
    } else {
      this.authentication = false;
    }
  }

  logout() {
    sessionStorage.removeItem('token');
    this.authentication = false;
    this.user = null;
    this.router.navigate(['/login']);
  }

  login(user, callback) {
    if (user.username !== null) {
      this.httpClient.post(`${this.url}/login`, {username: user.username, password: user.password}).subscribe(response => {
        if (response != null) {
          this.authentication = true;
          sessionStorage.setItem('token', btoa(user.username + ':' + user.password));
          this.user = user;
          this.router.navigate(['/project']);
        }
      });
    }
  }

  static get getHeaders() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + sessionStorage.getItem('token')
      })
    };
  }

  verification() {
    if (!this.authentication) {
      this.router.navigate(['/login']);
    }
  }

  getUser(): Observable<User> {
    return this.httpClient.get<User>(`${this.url}/api/users/current`, AccountService.getHeaders);
  }
}
