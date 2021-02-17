import DB from "../Database"

class ListRepository {
  constructor() {
    if (!ListRepository.instance) {
      ListRepository.instance = this
    }
    return ListRepository.instance
  }

  static async insert() {
    console.log("list.repository.js -> 12: insert", DB)
  }
}

const instance = new ListRepository()
Object.freeze(instance)

export default instance
