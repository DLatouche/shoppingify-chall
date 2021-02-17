import UserRepository from "./user.repository"

require("dotenv").config()

export default class UserService {
  constructor() {
    console.log("user.service.js -> 7: UserRepository", UserRepository)
    this.userRepository = UserRepository
  }

  create() {
    console.log("user.service.js -> 11: this.userRepository.insert", this.userRepository.insert)
    return this.userRepository.insert()
  }
}
