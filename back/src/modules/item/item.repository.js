import Category from "../category/category.model"
import DB from "../Database"
import Item from "./item.model"

class ItemRepository {
  constructor() {
    if (!ItemRepository.instance) {
      ItemRepository.instance = this
    }
    return ItemRepository.instance
  }

  async insert({ userId, item }) {
    try {
      const query = `INSERT INTO item (name, category_id, image, note, user_id) VALUES (?, ?, ?, ?, ?)`
      const params = [item.name, item.category.id, item.image, item.note, userId]
      const { results } = await DB.query({ query, params })

      return new Item({
        id: results.insertId,
        name: item.name,
        image: item.image,
        note: item.note,
        category: item.category,
      })
    } catch (error) {
      console.log("%item.repository.js -> 19 ERROR: error", "background: #FF0000; color:#FFFFFF", error)
      throw error
    }
  }

  async update({ userId, item }) {
    try {
      const query = `UPDATE item SET name=?, note=?, image=?, deleted=? WHERE id=? AND user_id=?`
      const params = [item.name, item.note, item.image, item.deleted, item.id, userId]
      return await DB.query({ query, params })
    } catch (error) {
      console.log("%item.repository.js -> 38 ERROR: error", "background: #FF0000; color:#FFFFFF", error)
      throw error
    }
  }

  async detele({ userId, itemId }) {
    try {
      const query = `DELETE FROM item WHERE id=? AND user_id=?`
      const params = [itemId, userId]
      return await DB.query({ query, params })
    } catch (error) {
      console.log("%item.repository.js -> 19 ERROR: error", "background: #FF0000; color:#FFFFFF", error)
      throw error
    }
  }

  async getItemsWithCategories({ userId }) {
    try {
      const query = `
      SELECT i.*, i.id as item_id, c.name as category_name, c.id as category_id 
      FROM item as i, category AS c 
      WHERE c.id = i.category_id AND c.user_id=?;
      `
      const params = [userId]
      const { results } = await DB.query({ query, params })
      const items = []
      results.forEach((res) => {
        const category = new Category({
          id: res.category_id,
          name: res.category_name,
        })
        const item = new Item({
          id: res.item_id,
          name: res.name,
          note: res.note,
          image: res.image,
          deleted: res.deleted,
          category,
        })
        items.push(item)
      })
      return items
    } catch (error) {
      console.log("category.repository.js -> 27: error", error)
      throw error
    }
  }
}

const instance = new ItemRepository()
Object.freeze(instance)

export default instance
