import express from "express"
import { authenticateToken } from "../../middleware"
import CategoryController from "./category.controller"

const categoryRouter = express.Router()
const categoryController = new CategoryController()

categoryRouter.get("/items", authenticateToken, (req, res) => {
  categoryController.getCategoriesWithItems({ req, res })
})

categoryRouter.post("/", authenticateToken, (req, res) => {
  categoryController.create({ req, res })
})

categoryRouter.get("/", authenticateToken, (req, res) => {
  categoryController.getCategories({ req, res })
})

module.exports = categoryRouter
