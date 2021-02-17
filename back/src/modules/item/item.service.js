import ItemRepository from "./item.repository"

require("dotenv").config()

export default class ItemService {
  constructor() {
    this.itemRepository = ItemRepository
  }

  create() {
    return this.itemRepository.insert()
  }
}
