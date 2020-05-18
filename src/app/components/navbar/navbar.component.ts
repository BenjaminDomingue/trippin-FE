import { Component } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { UserToLogin } from 'src/app/models/user-to-login';
import { Router } from '@angular/router';
import { AuthorizationDataService } from 'src/app/data-services/authorization.data-service';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  userToLogin: UserToLogin = { id: "",};

  constructor(
    private readonly authorizationService: AuthorizationService,
    private readonly router: Router,
    private readonly authorizationDataService: AuthorizationDataService,
  ) { }

  login() {
    this.authorizationService.login(this.userToLogin).subscribe(next => {
      const userId = this.authorizationDataService.decodedToken.nameid;
      this.router.navigate([`user/${userId}`]);
    }, error => {
      console.log(error);
    });
  }

  loggedIn() {
    return this.authorizationService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
  }

  getUserName() {
    return this.authorizationDataService.decodedToken.unique_name;
  }
}
