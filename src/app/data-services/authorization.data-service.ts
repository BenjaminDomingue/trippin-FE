import { Injectable } from '@angular/core';
import { UserToLogin } from '../models/user-to-login';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthorizationDataService {
  baseUrl = 'http://localhost:5000/api/itineraries/';

  constructor(private readonly httpCient: HttpClient) {
    this.login =
      this
        .login
        .bind(this);
  }

  // login(user: UserToLogin) {
  //   const url = this.baseUrl + 'login';
  //   return this.httpCient
  //     .post<UserToLogin, string>(this.baseUrl, user)
  // }

  login(userToLogin: UserToLogin) {
    return this.httpCient
      .post(this.baseUrl + 'login', userToLogin)
      .pipe(map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
        }
      })
      );
  }
}
