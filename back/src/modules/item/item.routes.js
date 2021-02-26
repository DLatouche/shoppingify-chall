import express from "express"
import { authenticateToken } from "../../middleware"
import ItemController from "./item.controller"

const itemRouter = express.Router()
const itemController = new ItemController()

itemRouter.post("/", authenticateToken, (req, res) => {
  itemController.create({ req, res })
})

itemRouter.get("/", authenticateToken, (req, res) => {
  itemController.getItems({ req, res })
})

itemRouter.delete("/", authenticateToken, (req, res) => {
  itemController.deleteItem({ req, res })
})
module.exports = itemRouter
