export default class List {
  constructor({ id, name, state, createdAt, categories }) {
    this.id = id
    this.name = name
    this.state = state
    this.createdAt = createdAt
    this.categories = categories || []
  }
}
