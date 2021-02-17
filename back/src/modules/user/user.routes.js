import express from "express"
import UserController from "./user.controller"

const userRouter = express.Router()
const userController = new UserController()

userRouter.get("/create", userController.create)

module.exports = userRouter
