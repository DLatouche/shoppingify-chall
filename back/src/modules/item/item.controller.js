import ItemService from "./item.service"

export default class ItemController {
  constructor() {
    this.itemService = new ItemService()
  }

  async create({ req, res }) {
    try {
      const { user } = req
      const { item } = req.body
      const newItem = await this.itemService.create({ userId: user.id, item })
      res.send({ item: newItem })
    } catch (error) {
      console.log("%item.controller.js -> 12 ERROR: error", "background: #FF0000; color:#FFFFFF", error)
      res.status(500).send(error)
    }
  }
}
