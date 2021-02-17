import { v4 as uuidv4 } from "uuid"
import { toMySQLDate } from "../../helper"
import UserRepository from "./user.repository"

require("dotenv").config()

export default class UserService {
  constructor() {
    this.userRepository = UserRepository
  }

  create() {
    const newUser = {
      id: null,
      token: uuidv4(),
      loginAt: toMySQLDate(new Date()),
    }
    return this.userRepository.insert({ user: newUser })
  }

  getByToken({ token }) {
    return this.userRepository.findWhere({ token })
  }
}
