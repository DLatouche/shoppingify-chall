import { toMySQLDate } from "../../helper"
import ListRepository from "./list.repository"

require("dotenv").config()

export default class ListService {
  constructor() {
    this.listRepository = ListRepository
  }

  async create({ userId, list }) {
    const listToInsert = { ...list, createdAt: toMySQLDate(new Date()) }
    return this.listRepository.insert({ userId, list: listToInsert })
  }
}
