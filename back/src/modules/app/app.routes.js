import express from "express"
import AppController from "./app.controller"

const appRouter = express.Router()
const appController = new AppController()

appRouter.get("/", appController.getHome)

module.exports = appRouter
