import UserService from "./user.service"

export default class UserController {
  constructor() {
    this.userService = new UserService()
  }

  async create({ req, res }) {
    try {
      console.log("user.controller.js -> 10: req.body", req.body)
      const newUser = await this.userService.create()
      console.log("user.controller.js -> 11: newUser", newUser)
      res.send({ user: newUser })
    } catch (error) {
      console.log("%cuser.controller.js -> 12 ERROR: error", "background: #FF0000; color:#FFFFFF", error)
      res.status(500).send(error)
    }
  }

  async getUser({ req, res }) {
    const { token } = req.params
    console.log("user.controller.js -> 21: req", req.params)
    if (!token) {
      return res.sendStatus(401)
    }
    try {
      const users = await this.userService.getByToken({ token })
      if (users.length > 0 && users[0].token === token) {
        const user = users[0]
        req.user = user
        return res.send({ user })
      }
      return res.sendStatus(401).send("Unauthorized")
    } catch (error) {
      console.log("%user.controler.js -> 13 ERROR: e", "background: #FF0000; color:#FFFFFF", error)
      return res.status(500).send(error)
    }
  }
}
