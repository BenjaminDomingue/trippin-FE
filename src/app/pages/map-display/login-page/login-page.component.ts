import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { UserToRegister } from 'src/app/models/user-to-register.model';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  showRegistrationForm: boolean | undefined;
  userToRegister: UserToRegister;

  constructor(private readonly authorizationService: AuthorizationService) { }

  ngOnInit() {
    this.showRegistrationForm = false;
  }

  ShowRegistrationForm() {
    this.showRegistrationForm = true;
  }

  CancelUserRegistration() {
    this.showRegistrationForm = false;
  }

  RegisterUser() {
    this.authorizationService.register(this.userToRegister).subscribe(() => {
      console.log("Registration successful")
    }, error => {
      console.log(error);
    });
  }
}
