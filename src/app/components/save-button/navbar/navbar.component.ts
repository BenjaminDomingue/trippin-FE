import { Component } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { UserToLogin } from 'src/app/models/user-to-login';
import { Router } from '@angular/router';

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
  ) { }

  login() {
    this.authorizationService.login(this.userToLogin).subscribe(next => {
      const userId = this.userToLogin.id;
      this.router.navigate(['user', this.userToLogin.id]);
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
}
