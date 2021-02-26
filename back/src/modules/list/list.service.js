import { toMySQLDate } from "../../helper"
import ListRepository from "./list.repository"

require("dotenv").config()

export default class ListService {
  constructor() {
    this.listRepository = ListRepository
  }

  async create({ userId, list }) {
    try {
      const listToInsert = { ...list, createdAt: toMySQLDate(new Date()) }
      return this.listRepository.insert({ userId, list: listToInsert })
    } catch (e) {
      console.log("%clist.service.js -> 17 ERROR: e", "background: #FF0000; color:#FFFFFF", e)
      return e
    }
  }

  async udpate({ userId, list }) {
    const listToUpdate = { ...list, items: [] }
    list.categories.forEach((category) => {
      listToUpdate.items.push(...category.items)
    })
    return this.listRepository.update({ userId, list })
  }

  async getLists({ userId }) {
    return this.listRepository.getListsWithAll({ userId })
  }
}
