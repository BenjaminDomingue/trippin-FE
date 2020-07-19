import { Injectable } from "@angular/core";
import { UserToLogin } from "../models/user-to-login";
import { UserToRegister } from "../models/user-to-register.model";
import { User } from "../models/user.model";
import { AppConfig } from "../constants/app.config";
import { HttpRequestService } from "../services/http-request.service";
import { Token } from "../models/token.model";

@Injectable({
  providedIn: "root",
})
export class AuthorizationDataService {
  // baseUrl = 'https://localhost:5000/api/user/';

  constructor(private readonly httpRequestService: HttpRequestService) {
    this.login =
      this
        .login
        .bind(this);

    this.register = this.register.bind(this);

    this.getUserById =
    this
      .getUserById
      .bind(this);
  }

  register(userToRegister: UserToRegister) {
    const url = `${AppConfig.current.apiBaseEndpoint}/user/register`;

    return this.httpRequestService.post<UserToRegister, User>(
      url,
      userToRegister
    );
  }

  // login(userToLogin: UserToLogin) {
  //   return this.httpRequestService
  //     .post(this.baseUrl + 'login', userToLogin);
  // }

  login(userToLogin: UserToLogin) {
    const url = `${AppConfig.current.apiBaseEndpoint}/user/login`;

    return this.httpRequestService.post<UserToLogin, Token>(url, userToLogin);
  }

  // register(userToRegister: UserToRegister) {
  //   return this.httpCient
  //     .post(this.baseUrl + 'register', userToRegister)
  //     .pipe(map((response: User) => {
  //       const user = response;
  //     }));
  // }

  getUserById(userId: string) {
    const url = `${AppConfig.current.apiBaseEndpoint}/users/${userId}`;

    return this.httpRequestService.get<User>(url);

    // return this.httpRequestService.get(`${this.baseUrl}${userId}`).pipe(
    //   map((response: User) => {
    //     return response;
    //   })
    // );
  }
}
