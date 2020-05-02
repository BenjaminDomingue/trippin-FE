import { Injectable } from '@angular/core';
import { UserToLogin } from '../models/user-to-login';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { UserToRegister } from '../models/user-to-register.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationDataService {
  baseUrl = 'https://localhost:44337/api/itinerary/';

  constructor(private readonly httpCient: HttpClient) {
    this.login =
      this
        .login
        .bind(this);
  }

  login(userToLogin: UserToLogin) {
    return this.httpCient
      .post(this.baseUrl + 'login', userToLogin)
      .pipe(map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user);
        }
      })
      );
  }

  register(userToRegister: UserToRegister) {
    return this.httpCient
      .post(this.baseUrl + 'register', userToRegister)
      .pipe(map((response: User) => {
        const user = response;
      }));
  }
}
