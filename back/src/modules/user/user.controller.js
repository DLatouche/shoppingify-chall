import UserService from "./user.service"

export default class UserController {
  constructor() {
    this.userService = new UserService()
  }

  async create({ res }) {
    console.log("user.controller.js -> 10: this.userService", this)
    try {
      const newUser = await this.userService.create()
      console.log("user.controller.js -> 11: newUser", newUser)
      res.send({ user: newUser })
    } catch (error) {
      console.log(
        "%cuser.controller.js -> 12 ERROR: error",
        "background: #FF0000; color:#FFFFFF",
        error
      )
      res.status(500).send(error)
    }
  }
}
