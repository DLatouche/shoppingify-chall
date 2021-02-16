import AppService from "./app.service"

export default class AppController {
  constructor() {
    this.appService = new AppService()
  }

  getHome() {
    console.log("home", this.appService)
  }
}
