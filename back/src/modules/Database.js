require("dotenv").config()

const USER = process.env.USER_DB
const PASSWORD = process.env.PASSWORD_DB
const URL = process.env.URL_DB

class DB {
  constructor() {
    if (!DB.instance) {
      this.driver = "driver"
      DB.instance = this
    }

    return DB.instance
  }
}

const instance = new DB()
Object.freeze(instance)

export default instance
