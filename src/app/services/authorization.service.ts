import { Injectable } from "@angular/core";
import { AuthorizationDataService } from "../data-services/authorization.data-service";
import { JwtHelperService } from "@auth0/angular-jwt";
import { BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";
import { UserToLogin } from "../models/user-to-login";
import { Token } from "../models/token.model";
import { UserToRegister } from "../models/user-to-register.model";
import { map } from "rxjs/internal/operators/map";

@Injectable({
  providedIn: "root",
})
export class AuthorizationService {
  private jwtHelper = new JwtHelperService();
  private decodedToken: any;
  userId: string | undefined;

  loginState = new BehaviorSubject<boolean>(false);

  login = this.authorizationDataService.login;
  register = this.authorizationDataService.register;
  getUserById = this.authorizationDataService.getUserById;

  constructor(
    private readonly authorizationDataService: AuthorizationDataService,
    private readonly router: Router
  ) {
    this.loginState.next(this.isUserLoggedIn());
  }

  loginUser(userToLogin: UserToLogin) {
    return this.authorizationDataService.login(userToLogin).pipe(
      map((response: Token) => {
        const token = response;
        if (token) {
          localStorage.setItem("token", token.userToken);
          this.loginState.next(true);
        }
      })
    );
  }

  loginRegisteredUser = (registeredUser: UserToRegister) => {
    const userToLogin = {
      id: registeredUser.id,
      email: registeredUser.email,
      password: registeredUser.password,
    };

    return this.loginUser(userToLogin);
  };

  isUserLoggedIn = () => {
    const token = localStorage.getItem("token");
    const isExpired = this.jwtHelper.isTokenExpired(token);

    return !isExpired;
  };

  effectivelyLoginUser = () => {
    const token = localStorage.getItem("token");

    this.decodedToken = this.jwtHelper.decodeToken(token);
    this.userId = this.decodedToken.nameid;

    this.router.navigate(["users", this.userId]);
  };

  logoutUser = () => {
    localStorage.removeItem("token");
    this.loginState.next(false);
  };
}
