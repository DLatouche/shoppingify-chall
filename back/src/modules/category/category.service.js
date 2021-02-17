import CategoryRepository from "./category.repository"

require("dotenv").config()

export default class CategoryService {
  constructor() {
    this.categoryRepository = CategoryRepository
  }

  create() {
    return this.categoryRepository.insert()
  }
}
