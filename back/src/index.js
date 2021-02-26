import cors from "cors"
import userRouter from "./modules/user/user.routes"
import listRouter from "./modules/list/list.routes"
import itemRouter from "./modules/item/item.routes"
import categoryRouter from "./modules/category/category.routes"

const express = require("express")
const bodyParser = require("body-parser")

const app = express()
const baseUrl = "/api"
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
let nbRequests = 1
const debug = (req, res, next) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }
  console.log(
    `Request ${nbRequests} at: `,
    new Date().toLocaleDateString("EN", options),
    "to ",
    req.method,
    ": ",
    req.originalUrl
  )
  nbRequests += 1
  next()
}
app.use(`${baseUrl}/users`, debug, userRouter)
app.use(`${baseUrl}/lists`, debug, listRouter)
app.use(`${baseUrl}/items`, debug, itemRouter)
app.use(`${baseUrl}/categories`, debug, categoryRouter)

module.exports = app
