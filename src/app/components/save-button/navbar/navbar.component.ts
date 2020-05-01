import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { UserToLogin } from 'src/app/models/user-to-login';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: UserToLogin = {};

  constructor(private readonly authorizationService: AuthorizationService) { }

  ngOnInit() {
  }

  login() {
    this.authorizationService.login(this.user).subscribe(next => {
      console.log('Logged in successfully');
    }, error => {
      console.log('Failed to login');
    })
  }

}
