import {Authorities} from "./authorities";

export class User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  position: string;
  phone: string;
  email: string;
  password: string;
  authorities: Authorities[];

  setUser(id: number, username: string, firstName: string, lastName: string, position: string, phone: string, email: string, authorities: Authorities[]) {
    this.id = id;
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.position = position;
    this.phone = phone;
    this.email = email;
    this.authorities = authorities;
  }
}
