import DB from "../Database"

class UserRepository {
  constructor() {
    if (!UserRepository.instance) {
      UserRepository.instance = this
    }
    return UserRepository.instance
  }

  insert() {
    console.log("user.repository.js -> 12: insert", DB)
  }
}

const instance = new UserRepository()
Object.freeze(instance)

export default instance
