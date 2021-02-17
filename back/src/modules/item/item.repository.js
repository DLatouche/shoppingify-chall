import DB from "../Database"

class ItemRepository {
  constructor() {
    if (!ItemRepository.instance) {
      ItemRepository.instance = this
    }
    return ItemRepository.instance
  }

  static async insert() {
    console.log("item.repository.js -> 12: insert", DB)
  }
}

const instance = new ItemRepository()
Object.freeze(instance)

export default instance
