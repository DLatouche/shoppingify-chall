import mysql from "mysql"

require("dotenv").config()

const { DB_NAME, DB_HOST, DB_PASS, DB_USER } = process.env

class DB {
  constructor() {
    if (!DB.instance) {
      this.connection = mysql.createConnection({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASS,
        database: DB_NAME,
        insecureAuth: true,
      })
      this.connection.connect()
      DB.instance = this
    }

    return DB.instance
  }

  query({ query, params }) {
    return new Promise((resolve, reject) => {
      this.connection.query(query, params, (error, results, fields) => {
        if (error) reject(error)
        else resolve({ results, fields })
      })
    })
  }
}

const instance = new DB()
Object.freeze(instance)

export default instance
