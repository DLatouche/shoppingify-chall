import { objToArray } from "../../helper"
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
        createdAt: list.createdAt,
      })

      if (list.categories && list.categories.length > 0) {
        const queries = []
        list.categories.forEach((category) => {
          category.items.forEach((item) => {
            const queryItem = "INSERT INTO list_item (list_id, item_id, quantity, is_checked) VALUES (?, ?, ?, ?)"
            const paramsItem = [newList.id, item.id, item.quantity ? item.quantity : 0, item.isChecked ? 1 : 0]
            queries.push({ query: queryItem, params: paramsItem })
          })
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
        createdAt: list.createdAt,
      })

      const queries = []
      queries.push({
        query: "DELETE FROM list_item WHERE list_id IN (SELECT id FROM list WHERE user_id=? AND id=?)",
        params: [userId, list.id],
      })
      list.categories.forEach((category) => {
        category.items.forEach((item) => {
          const queryItem = "INSERT INTO list_item (list_id, item_id, quantity, is_checked) VALUES (?, ?, ?, ?)"
          const paramsItem = [list.id, item.id, item.quantity ? item.quantity : 0, item.isChecked ? 1 : 0]
          queries.push({ query: queryItem, params: paramsItem })
        })
      })
      await DB.transaction({ queries })
      listUpdated.categories = list.categories ? list.categories : []
      return listUpdated
    } catch (error) {
      console.log("%list.repository.js -> 43 ERROR: error", "background: #FF0000; color:#FFFFFF", error)
      throw error
    }
  }

  async getListsWithAll({ userId }) {
    try {
      const query = `
      SELECT distinct
	      list.id as list_id, list.name as list_name, list.state, list.created_at,
        list_item.quantity, list_item.is_checked,
        item.id as item_id, item.name as item_name, item.note, item.image,
        category_id, category.name as category_name
      FROM list 
        LEFT JOIN list_item ON list_item.list_id = list.id
        LEFT JOIN item ON list_item.item_id = item.id
        LEFT JOIN category ON item.category_id = category.id
      WHERE list.user_id=?
      ORDER BY list_id, category_id, item_id`
      const params = [userId]
      const { results } = await DB.query({ query, params })
      const listsO = {}
      results.forEach((res) => {
        const category = {
          id: res.category_id,
          name: res.category_name,
          items: [],
        }
        const item = {
          id: res.item_id,
          name: res.item_name,
          quantity: res.quantity,
          isChecked: res.is_checked === 1,
          image: res.image,
          note: res.note,
          category: { id: res.category_id, name: res.category_name },
        }
        const list = {
          id: res.list_id,
          name: res.list_name,
          state: res.state,
          createdAt: new Date(res.created_at),
          categories: {},
        }
        if (!listsO[list.id]) {
          // new list
          listsO[list.id] = {
            ...list,
          }
        }
        if (category.id && !listsO[list.id].categories[category.id]) {
          // new category
          if (item.id) category.items.push(item)
          listsO[list.id].categories[category.id] = { ...category }
        } else if (category.id && listsO[list.id].categories[category.id]) {
          if (item.id) listsO[list.id].categories[category.id].items.push(item)
        }
      })
      const lists = Object.keys(listsO).map((key) => ({
        ...listsO[key],
        categories: objToArray(listsO[key].categories),
      }))
      return lists
    } catch (error) {
      console.log("%list.repository.js -> 43 ERROR: error", "background: #FF0000; color:#FFFFFF", error)
      throw error
    }
  }
}

const instance = new ListRepository()
Object.freeze(instance)

export default instance
