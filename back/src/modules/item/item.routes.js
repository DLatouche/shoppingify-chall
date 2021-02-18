import express from "express"
import { authenticateToken } from "../../middleware"
import ItemController from "./item.controller"

const itemRouter = express.Router()
const itemController = new ItemController()

itemRouter.post("/", authenticateToken, (req, res) => {
  itemController.create({ req, res })
})

module.exports = itemRouter
