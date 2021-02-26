export default class Item {
  constructor({ id, name, note, image, category, deleted }) {
    this.id = id
    this.name = name
    this.note = note || ""
    this.image = image || ""
    this.category = category || {}
    this.deleted = deleted
  }
}
