import { Injectable } from '@angular/core';
import { AuthorizationDataService } from '../data-services/authorization.data-service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  login = this.authorizationDataService.login;
  register = this.authorizationDataService.register;

  jwtHelper = new JwtHelperService();
  decodedToken: any

  constructor(private readonly authorizationDataService: AuthorizationDataService) { }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
