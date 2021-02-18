export default class List {
  constructor({ id, name, state, loginAt, items }) {
    this.id = id
    this.name = name
    this.state = state
    this.loginAt = loginAt
    this.items = items || []
  }
}
