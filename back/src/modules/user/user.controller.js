import UserService from "./user.service"

export default class UserController {
  constructor() {
    this.userService = new UserService()
  }

  async create(req, res) {
    res.send(await this.userService.create())
  }
}
