import { Injectable } from '@angular/core';
import { UserToLogin } from '../models/user-to-login';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { UserToRegister } from '../models/user-to-register.model';
import { User } from '../models/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationDataService {
  baseUrl = 'https://localhost:5000/api/user/';

  jwtHelper = new JwtHelperService();
  decodedToken: any

  constructor(private readonly httpCient: HttpClient) {
    this.login =
      this
        .login
        .bind(this);

    this.register =
      this
        .register
        .bind(this);

    this.loggedIn = 
      this
        .loggedIn
        .bind(this);

    this.getUserById =
    this
      .getUserById
      .bind(this);
  }

  login(userToLogin: UserToLogin) {
    return this.httpCient
      .post(this.baseUrl + 'login', userToLogin)
      .pipe(map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.userToken);
          this.decodedToken = this.jwtHelper.decodeToken(user.userToken);
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

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
  
  getUserById(userId: string) {
    return this.httpCient
      .get(`${this.baseUrl}${userId}`)
      .pipe(map((response: User) => {
        return response;
      }))
  }
}
