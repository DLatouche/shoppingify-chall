export default class List {
  constructor({ id, name, state, loginAt, categories }) {
    this.id = id
    this.name = name
    this.state = state
    this.loginAt = loginAt
    this.categories = categories || []
  }
}
