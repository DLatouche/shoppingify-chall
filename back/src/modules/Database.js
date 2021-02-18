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

  transaction({ queries }) {
    return new Promise((resolve, reject) => {
      const resultsTransaction = []
      this.connection.beginTransaction((error) => {
        if (error) reject(error)
        queries.forEach((query) => {
          this.connection.query(query.query, query.params, (err, results, fields) => {
            if (err) {
              return this.connection.rollback(() => {
                throw err
              })
            }
            resultsTransaction.push({ results, fields })
          })
        })
        this.connection.commit((errCommit) => {
          if (errCommit) {
            return this.connection.rollback(() => {
              throw errCommit
            })
          }
          resolve(resultsTransaction)
        })
      })
    })
  }
}

const instance = new DB()
Object.freeze(instance)

export default instance
