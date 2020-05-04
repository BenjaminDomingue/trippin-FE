import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { UserToLogin } from 'src/app/models/user-to-login';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userToLogin: UserToLogin = {};
  isLoggedIn: boolean | undefined;

  constructor(private readonly authorizationService: AuthorizationService) { }

  ngOnInit() {
    this.isLoggedIn = false;
  }

  login() {
    this.authorizationService.login(this.userToLogin).subscribe(next => {
      console.log('Logged in successfully');
      this.isLoggedIn = true;
    }, error => {
      console.log(error);
    });
  }
  ConfirmUserLogin = () => {
    this.isLoggedIn = true;
  }

  logout() {
    localStorage.removeItem('token');
    console.log("logout");
    this.isLoggedIn = false;
  }

}
