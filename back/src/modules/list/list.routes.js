import express from "express"
import { authenticateToken } from "../../middleware"
import ListController from "./list.controller"

const listRouter = express.Router()
const listController = new ListController()

listRouter.post("/", authenticateToken, (req, res) => {
  listController.create({ req, res })
})

listRouter.patch("/", authenticateToken, (req, res) => {
  listController.update({ req, res })
})

listRouter.get("/", authenticateToken, (req, res) => {
  listController.getLists({ req, res })
})

module.exports = listRouter
