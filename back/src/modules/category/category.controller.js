import CategoryService from "./category.service"

export default class CategoryController {
  constructor() {
    this.categoryService = new CategoryService()
  }

  async create({ req, res }) {
    const { user } = req
    const { category } = req.body
    console.log("category.controller.js -> 11: category", category)
    const newCategory = await this.categoryService.create({ userId: user.id, category })
    res.send({ category: newCategory })
  }

  async getCategories({ req, res }) {
    try {
      const categories = await this.categoryService.getCategories({
        userId: req.user.id,
      })
      res.send({ categories })
    } catch (error) {
      console.log("%ccategory.controller.js -> 19 ERROR: error", "background: #FF0000; color:#FFFFFF", error)
      res.status(500).send(error)
    }
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
