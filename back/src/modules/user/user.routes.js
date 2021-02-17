import express from "express"
import UserController from "./user.controller"

const userRouter = express.Router()
const userController = new UserController()

userRouter.post("/create", (req, res) => {
  userController.create({ req, res })
})

module.exports = userRouter
