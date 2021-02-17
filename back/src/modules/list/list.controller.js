import ListService from "./list.service"

export default class ListController {
  constructor() {
    this.listService = new ListService()
  }

  async create(req, res) {
    res.send(await this.listService.create())
  }
}
