import { Component, OnInit } from '@angular/core';
import { UserToRegister } from 'src/app/models/user-to-register.model';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  showRegistrationForm: boolean | undefined;
  userToRegister: UserToRegister;

  constructor() { }

  ngOnInit() {
    this.showRegistrationForm = false;
  }

  ShowRegistrationForm() {
    this.showRegistrationForm = true;
  }

  CancelRegistration = () => {
    this.showRegistrationForm = false;
  }
}
