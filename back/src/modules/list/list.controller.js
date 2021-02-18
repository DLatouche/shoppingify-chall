import ListService from "./list.service"

export default class ListController {
  constructor() {
    this.listService = new ListService()
  }

  async create({ req, res }) {
    try {
      const { user } = req
      const { list } = req.body
      const newList = await this.listService.create({ userId: user.id, list })
      res.send({ list: newList })
    } catch (error) {
      console.log("%list.controller.js -> 12 ERROR: error", "background: #FF0000; color:#FFFFFF", error)
      res.status(500).send(error)
    }
  }
}
