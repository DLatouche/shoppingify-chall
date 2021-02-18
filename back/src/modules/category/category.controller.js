import CategoryService from "./category.service"

export default class CategoryController {
  constructor() {
    this.categoryService = new CategoryService()
  }

  async create(req, res) {
    res.send(await this.categoryService.create())
  }

  async getCategoriesWithItems({ req, res }) {
    try {
      const categories = await this.categoryService.getCategoriesWithItems({
        userId: req.user.id,
      })
      res.send({ categories })
    } catch (error) {
      console.log("%ccategory.controller.js -> 18 ERROR: error", "background: #FF0000; color:#FFFFFF", error)
      res.status(500).send(error)
    }
  }
}
