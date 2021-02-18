import DB from "../Database"
import List from "./list.model"

class ListRepository {
  constructor() {
    if (!ListRepository.instance) {
      ListRepository.instance = this
    }
    return ListRepository.instance
  }

  async insert({ userId, list }) {
    try {
      const query = `INSERT INTO list (user_id, name, state, created_at) VALUES (?, ?, ?, ?)`
      const params = [userId, list.name, list.state, list.createdAt]
      const { results } = await DB.query({ query, params })

      return new List({
        id: results.insertId,
        name: list.name,
        state: list.state,
        createAt: list.createAt,
      })
    } catch (error) {
      console.log("%list.repository.js -> 19 ERROR: error", "background: #FF0000; color:#FFFFFF", error)
      throw error
    }
  }
}

const instance = new ListRepository()
Object.freeze(instance)

export default instance
