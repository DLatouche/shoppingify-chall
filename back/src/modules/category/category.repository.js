import DB from "../Database"

class CategoryRepository {
  constructor() {
    if (!CategoryRepository.instance) {
      CategoryRepository.instance = this
    }
    return CategoryRepository.instance
  }

  static async insert() {
    console.log("category.repository.js -> 12: insert", DB)
  }
}

const instance = new CategoryRepository()
Object.freeze(instance)

export default instance
