import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserToRegister } from 'src/app/models/user-to-register.model';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css']
})
export class SignUpFormComponent implements OnInit {
  userToRegister: UserToRegister = {};

  @Output() cancelRegistration = new EventEmitter<any>();

  constructor(
    private readonly authorizationService: AuthorizationService,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
  }

  RegisterUser() {
    this.authorizationService.register(this.userToRegister).subscribe(() => {
      console.log("Registration successful");
      this.router.navigate(['/map']);
    }, error => {
      console.log(error);
    });
    console.log("hello");
  }

  CancelUserRegistration = () => {
    this.cancelRegistration.emit();
  }
}
