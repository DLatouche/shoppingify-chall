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
}

const instance = new ItemRepository()
Object.freeze(instance)

export default instance
