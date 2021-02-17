import express from "express"
import CategoryController from "./category.controller"

const categoryRouter = express.Router()
const categoryController = new CategoryController()

categoryRouter.get("/create", categoryController.create)

module.exports = categoryRouter
