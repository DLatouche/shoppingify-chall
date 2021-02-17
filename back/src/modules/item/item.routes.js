import express from "express"
import ItemController from "./item.controller"

const itemRouter = express.Router()
const itemController = new ItemController()

itemRouter.get("/create", itemController.create)

module.exports = itemRouter
