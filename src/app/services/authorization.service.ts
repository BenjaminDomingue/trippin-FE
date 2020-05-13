import { Injectable } from '@angular/core';
import { AuthorizationDataService } from '../data-services/authorization.data-service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  login = this.authorizationDataService.login;
  register = this.authorizationDataService.register;
  loggedIn = this.authorizationDataService.loggedIn;
  getUserById = this.authorizationDataService.getUserById;
  decodedToken: any;

  constructor(private readonly authorizationDataService: AuthorizationDataService) {
    this.decodedToken = this.authorizationDataService.decodedToken;
   }
}
