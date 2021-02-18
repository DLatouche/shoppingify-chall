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
      const newList = new List({
        id: results.insertId,
        name: list.name,
        state: list.state,
        createAt: list.createAt,
      })

      if (list.items && list.items.length > 0) {
        const queries = []
        list.items.forEach((item) => {
          const queryItem = "INSERT INTO list_item (list_id, item_id, quantity, is_checked) VALUES (?, ?, ?, ?)"
          const paramsItem = [newList.id, item.id, item.quantity ? item.quantity : 0, item.isChecked ? 1 : 0]
          queries.push({ query: queryItem, params: paramsItem })
        })
        await DB.transaction({ queries })
        newList.items = list.items
      }

      return newList
    } catch (error) {
      console.log("%list.repository.js -> 19 ERROR: error", "background: #FF0000; color:#FFFFFF", error)
      throw error
    }
  }

  async update({ userId, list }) {
    try {
      const query = `UPDATE list SET name=?, state=? WHERE id=? AND user_id=?`
      const params = [list.name, list.state, list.id, userId]
      await DB.query({ query, params })
      const listUpdated = new List({
        id: list.id,
        name: list.name,
        state: list.state,
        createAt: list.createAt,
      })

      const queries = []
      queries.push({
        query: "DELETE FROM list_item WHERE list_id IN (SELECT id FROM list WHERE user_id=? AND id=?)",
        params: [userId, list.id],
      })
      list.items.forEach((item) => {
        const queryItem = "INSERT INTO list_item (list_id, item_id, quantity, is_checked) VALUES (?, ?, ?, ?)"
        const paramsItem = [list.id, item.id, item.quantity ? item.quantity : 0, item.isChecked ? 1 : 0]
        queries.push({ query: queryItem, params: paramsItem })
      })
      await DB.transaction({ queries })
      listUpdated.items = list.items ? list.items : []
      return listUpdated
    } catch (error) {
      console.log("%list.repository.js -> 43 ERROR: error", "background: #FF0000; color:#FFFFFF", error)
      throw error
    }
  }
}

const instance = new ListRepository()
Object.freeze(instance)

export default instance
