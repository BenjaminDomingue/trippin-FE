import { Component, OnInit } from "@angular/core";
import { AuthorizationService } from "src/app/services/authorization.service";
import { Router } from "@angular/router";
import { UserToRegister } from "src/app/models/user-to-register.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.css"],
})
export class RegistrationComponent implements OnInit {
  userToRegister: UserToRegister = {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    username: "",
  };

  userId: string | undefined;
  registerForm: FormGroup;
  submitted: boolean | undefined;

  constructor(
    private readonly authorizationService: AuthorizationService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  RegisterUser() {
    this.submitted = true;

    const userToRegister = {
      id: "",
      type: "",
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      email: this.email.value,
      password: this.password.value,
      username: this.username.value,
    };

    this.authorizationService.register(userToRegister).subscribe(() => {
      this.authorizationService
        .loginRegisteredUser(userToRegister)
        .subscribe((_) => this.authorizationService.effectivelyLoginUser());
    });
  }

  CancelUserRegistration = () => {
    this.registerForm.reset();
  };

  get firstName() {
    return this.registerForm.get("firstName");
  }

  get lastName() {
    return this.registerForm.get("lastName");
  }

  get email() {
    return this.registerForm.get("email");
  }

  get username() {
    return this.registerForm.get("username");
  }

  get password() {
    return this.registerForm.get("password");
  }
}
