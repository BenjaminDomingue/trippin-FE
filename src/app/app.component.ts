import { Component, OnInit } from "@angular/core";
import { AuthorizationService } from "./services/authorization.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  isUserLoggedIn = false;
  constructor(
    private authorizationService: AuthorizationService,
    private readonly router: Router
  ) {
    this.authorizationService.loginState.subscribe(
      (isUserLoggedIn) => (this.isUserLoggedIn = isUserLoggedIn)
    );
  }
  ngOnInit() {
    if (!this.isUserLoggedIn) {
      this.router.navigate(["login"]);
    } else {
      this.authorizationService.effectivelyLoginUser();
    }
  }
}
