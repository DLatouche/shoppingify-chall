import ItemService from "./item.service"

export default class ItemController {
  constructor() {
    this.itemService = new ItemService()
  }

  async create(req, res) {
    res.send(await this.itemService.create())
  }
}
