import CategoryService from "./category.service"

export default class CategoryController {
  constructor() {
    this.categoryService = new CategoryService()
  }

  async create(req, res) {
    res.send(await this.categoryService.create())
  }

  async getCategoriesWithItems({ res }) {
    res.send("OK")
  }
}
