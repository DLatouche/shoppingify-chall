import ListService from "./list.service"

export default class ListController {
  constructor() {
    this.listService = new ListService()
  }

  async create({ req, res }) {
    try {
      const { user } = req
      const { list } = req.body
      const newList = await this.listService.create({ userId: user.id, list })
      return res.send({ list: newList })
    } catch (error) {
      console.log("%list.controller.js -> 12 ERROR: error", "background: #FF0000; color:#FFFFFF", error)
      return res.status(500).send(error)
    }
  }

  async update({ req, res }) {
    try {
      const { user } = req
      const { list } = req.body
      console.log("list.controller.js -> 24: list", list)
      const updatedList = await this.listService.udpate({
        userId: user.id,
        list,
      })
      res.send({ list: updatedList })
    } catch (error) {
      console.log("%list.controller.js -> 12 ERROR: error", "background: #FF0000; color:#FFFFFF", error)
      res.status(500).send(error)
    }
  }

  async getLists({ req, res }) {
    try {
      const { user } = req
      const lists = await this.listService.getLists({
        userId: user.id,
      })
      // Check if new list is needed
      let newListIsNeeded = false
      if (lists.length === 0) newListIsNeeded = true
      if (!newListIsNeeded) {
        let i = 0
        let stateFind = false
        while (i < lists.length && !stateFind) {
          if (lists[i].state === "EDITING" || lists[i].state === "IN_PROGRESS") stateFind = true
          i += 1
        }
      }
      if (newListIsNeeded) {
        // create new list
        const newList = await this.listService.create({
          userId: user.id,
          list: {
            id: null,
            state: "EDITING",
            name: "New list",
          },
        })
        newList.categories = []
        lists.push(newList)
      }

      res.send({ lists })
    } catch (error) {
      console.log("%list.controller.js -> 12 ERROR: error", "background: #FF0000; color:#FFFFFF", error)
      res.status(500).send(error)
    }
  }
}
