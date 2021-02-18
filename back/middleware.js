require("dotenv").config()

const { ACCESS_TOKEN_SECRET } = process.env

export default (req, res, next) => {
  console.log("middleware.js -> 7: checkAuth", ACCESS_TOKEN_SECRET)
  next()
}
