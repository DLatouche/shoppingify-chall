import express from "express"
import { authenticateToken } from "../../middleware"
import UserController from "./user.controller"

const userRouter = express.Router()
const userController = new UserController()

userRouter.post("/", (req, res) => {
  userController.create({ req, res })
})

userRouter.get("/:token", (req, res) => {
  userController.getUser({ req, res })
})

module.exports = userRouter
