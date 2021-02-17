export default class User {
  constructor({ id, token, loginAt }) {
    this.id = id
    this.token = token
    this.loginAt = new Date(loginAt)
  }
}
