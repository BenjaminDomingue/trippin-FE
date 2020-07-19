import { Component, OnInit } from "@angular/core";
import { UserToRegister } from "src/app/models/user-to-register.model";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { AuthorizationService } from "src/app/services/authorization.service";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.css"],
})
export class LoginPageComponent implements OnInit {
  userToRegister: UserToRegister;
  loginForm: FormGroup;
  submitted: boolean | undefined;

  constructor(
    private fb: FormBuilder,
    private readonly authorizationService: AuthorizationService
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  loginUser() {
    this.submitted = true;
    const loginUser = {
      id: "",
      email: this.email.value,
      password: this.password.value,
    };

    this.authorizationService.loginUser(loginUser).subscribe(() => {
      this.authorizationService.effectivelyLoginUser();
    });
  }

  CancelRegistration = () => {
    this.loginForm.reset();
  };

  get email() {
    return this.loginForm.get("email");
  }

  get password() {
    return this.loginForm.get("password");
  }
}
