require("dotenv").config()

const { ACCESS_TOKEN_SECRET } = process.env

export default (req, res, next) => {
  next()
}
