import { Config } from "./config";
declare var require: any;

export class AppConfig {
  static get current(): Config {
    switch (window.location.hostname) {
      case "localhost":
        return require("./app.config.local.json");
      // case "beslogic-activities-frontend-dev.azurewebsites.net":
      //   return require("./app.config.dev.json");
    }
  }
}
