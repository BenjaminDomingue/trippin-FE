import { Component, OnInit } from '@angular/core';
import { UserToLogin } from 'src/app/models/user-to-login';
import { UserToRegister } from 'src/app/models/user-to-register.model';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css']
})
export class SignUpFormComponent implements OnInit {
userToRegister: UserToRegister | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
