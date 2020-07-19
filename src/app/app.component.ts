import { Component, OnInit } from '@angular/core';
import { AuthorizationDataService } from './data-services/authorization.data-service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  jwtHelper = new JwtHelperService();
  constructor(private auhtorizationDataService: AuthorizationDataService) {

  }
  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      // this.auhtorizationDataService.decodedToken = this.jwtHelper.decodeToken(token);
    }
  }
}
