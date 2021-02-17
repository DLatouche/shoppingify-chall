import ListRepository from "./list.repository"

require("dotenv").config()

export default class ListService {
  constructor() {
    this.listRepository = ListRepository
  }

  create() {
    return this.listRepository.insert()
  }
}
