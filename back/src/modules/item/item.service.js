import CategoryService from "../category/category.service"
import ItemRepository from "./item.repository"

require("dotenv").config()

export default class ItemService {
  constructor() {
    this.itemRepository = ItemRepository
    this.categoryService = new CategoryService()
  }

  async create({ userId, item }) {
    return this.itemRepository.insert({ userId, item })
  }
}
