import DB from "../Database"
import User from "./user.model"

class UserRepository {
  constructor() {
    if (!UserRepository.instance) {
      this.tableName = "user"
      UserRepository.instance = this
    }
    return UserRepository.instance
  }

  async insert({ user }) {
    try {
      const query = `INSERT INTO ${this.tableName} (token, login_at) VALUES (?, ?)`
      const params = [user.token, user.loginAt]
      const { results } = await DB.query({ query, params })
      const newUser = {
        id: results.insertId,
        token: user.token,
        loginAt: user.loginAt,
      }
      return newUser
    } catch (error) {
      console.log("%cuser.repository.js -> 19 ERROR: error", "background: #FF0000; color:#FFFFFF", error)
      throw error
    }
  }

  async findWhere(args) {
    try {
      const params = []
      let query = `SELECT * FROM ${this.tableName} WHERE `
      Object.keys(args).forEach((key, index) => {
        params.push(args[key])
        if (index > 0) query += " AND "
        query += `${key}=?`
      })
      const { results } = await DB.query({ query, params })
      return results.map((res) => new User({ id: res.id, token: res.token, loginAt: res.loginAt }))
    } catch (error) {
      console.log("%cuser.repository.js -> 40 ERROR: error", "background: #FF0000; color:#FFFFFF", error)
      throw error
    }
  }
}

const instance = new UserRepository()
Object.freeze(instance)

export default instance
