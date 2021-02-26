import { objToArray } from "../../helper"
import DB from "../Database"
import Item from "../item/item.model"
import Category from "./category.model"

class CategoryRepository {
  constructor() {
    if (!CategoryRepository.instance) {
      CategoryRepository.instance = this
    }
    return CategoryRepository.instance
  }

  async insert({ userId, category }) {
    try {
      const query = `INSERT INTO category (name, user_id) VALUES (?, ?)`
      const params = [category.name, userId]
      const { results } = await DB.query({ query, params })

      return new Category({
        id: results.insertId,
        name: category.name,
      })
    } catch (error) {
      console.log("%category.repository.js -> 19 ERROR: error", "background: #FF0000; color:#FFFFFF", error)
      throw error
    }
  }

  async getCategories({ userId }) {
    try {
      const query = `
      SELECT DISTINCT  * FROM category WHERE user_id=?
      `
      const params = [userId]
      const { results } = await DB.query({ query, params })
      const categories = []
      results.forEach((res) => {
        categories.push(
          new Category({
            id: res.id,
            name: res.name,
          })
        )
      })
      return categories
    } catch (error) {
      console.log("category.repository.js -> 48: error", error)
      throw error
    }
  }

  async getCategoriesWithItems({ userId }) {
    try {
      const query = `
      SELECT DISTINCT  i.*, i.id as item_id, c.name as category_name, c.id as category_id FROM item as i RIGHT JOIN category AS c ON c.id = i.category_id, item WHERE c.user_id=?
      `
      const params = [userId]
      const { results } = await DB.query({ query, params })
      const categories = {}
      results.forEach((res) => {
        const category = new Category({
          id: res.category_id,
          name: res.category_name,
        })
        const item = res.item_id
          ? new Item({
              id: res.item_id,
              note: res.note,
              image: res.image,
              category,
            })
          : null
        if (categories[category.id]) categories[category.id].items.push(item)
        else
          categories[category.id] = {
            ...category,
            items: item ? [item] : [],
          }
      })
      return objToArray(categories)
    } catch (error) {
      console.log("category.repository.js -> 27: error", error)
      throw error
    }
  }
}

const instance = new CategoryRepository()
Object.freeze(instance)

export default instance
