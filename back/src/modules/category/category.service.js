import CategoryRepository from "./category.repository"

require("dotenv").config()

export default class CategoryService {
  constructor() {
    this.categoryRepository = CategoryRepository
  }

  create({ userId, category }) {
    return this.categoryRepository.insert({ userId, category })
  }

  async getCategoriesWithItems({ userId }) {
    const categories = await this.categoryRepository.getCategoriesWithItems({
      userId,
    })
    return categories
  }

  async getCategories({ userId }) {
    const categories = await this.categoryRepository.getCategories({
      userId,
    })
    return categories
  }
}
