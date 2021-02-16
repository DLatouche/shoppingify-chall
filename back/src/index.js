import cors from "cors"
import appRouter from "./modules/app/app.routes"

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
    req.url
  )
  nbRequests += 1
  next()
}
app.use(`${baseUrl}/`, debug, appRouter)
// app.use(baseUrl + "/users", debug, userRouter)

module.exports = app
