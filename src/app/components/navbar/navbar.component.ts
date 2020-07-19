import { Component, Input } from "@angular/core";
import { AuthorizationService } from "src/app/services/authorization.service";
import { UserToLogin } from "src/app/models/user-to-login";
import { Router } from "@angular/router";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent {
  userToLogin: UserToLogin = { id: "" };
  @Input()
  isUserLoggedIn = false;

  constructor(
    private readonly authorizationService: AuthorizationService,
    private readonly router: Router
  ) {}

  login() {
    this.router.navigate(["/login"]);
  }

  register() {
    this.router.navigate(["/registration"]);
  }

  logout() {
    this.authorizationService.logoutUser();
    this.router.navigate(["/login"]);
  }
}
