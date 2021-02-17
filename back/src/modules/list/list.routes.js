import express from "express"
import ListController from "./list.controller"

const listRouter = express.Router()
const listController = new ListController()

listRouter.get("/create", listController.create)

module.exports = listRouter
