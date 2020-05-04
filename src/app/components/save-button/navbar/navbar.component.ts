import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { UserToLogin } from 'src/app/models/user-to-login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userToLogin: UserToLogin = {};
  isLoggedIn: boolean | undefined;

  constructor(
    private readonly authorizationService: AuthorizationService,
    private readonly router: Router,
  ) { }

  ngOnInit() {
    this.isLoggedIn = false;
  }

  login() {
    this.authorizationService.login(this.userToLogin).subscribe(next => {
      this.isLoggedIn = true;
      this.router.navigate(['user']);
    }, error => {
      console.log(error);
    });
  }
  ConfirmUserLogin = () => {
    this.isLoggedIn = true;
  }

  logout() {
    localStorage.removeItem('token');
    this.isLoggedIn = false;
  }

}
