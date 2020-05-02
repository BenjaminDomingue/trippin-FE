import { Injectable } from '@angular/core';
import { AuthorizationDataService } from '../data-services/authorization.data-service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  login = this.authorizationDataService.login;
  register = this.authorizationDataService.register;

  constructor(private readonly authorizationDataService: AuthorizationDataService) { }

}
