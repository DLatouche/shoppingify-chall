import CategoryService from "../category/category.service"
import ItemRepository from "./item.repository"

require("dotenv").config()

export default class ItemService {
  constructor() {
    this.itemRepository = ItemRepository
  }

  async create({ userId, item }) {
    return this.itemRepository.insert({ userId, item })
  }

  async getItemsWithCategories({ userId }) {
    return this.itemRepository.getItemsWithCategories({ userId })
  }

  async update({ userId, item }) {
    return this.itemRepository.update({ userId, item })
  }

  async delete({ userId, itemId }) {
    return this.itemRepository.detele({ userId, itemId })
  }
}
