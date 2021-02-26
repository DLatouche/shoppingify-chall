import { createSelector } from "reselect"
import { twoNumbers } from "../../utilities/helper"
export const listsSelector = ({ lists }) => lists

export const currentListSelector = createSelector(listsSelector, (lists) => {
  return lists.filter((list) => list.state === "EDITING" || list.state === "IN_PROGRESS")[0]
})

export const listsCancelledOrCompleted = createSelector(listsSelector, (lists) => {
  return lists.filter((list) => list.state === "COMPLETED" || list.state === "CANCELLED")
})

export const listByMonthSelector = createSelector(listsSelector, (lists) => {
  let months = {}
  lists.forEach((list) => {
    list.createdAt = new Date(list.createdAt)
    if (list.state === "COMPLETED" || list.state === "CANCELLED") {
      let nameMonth = list.createdAt.getFullYear() + "" + twoNumbers(list.createdAt.getMonth())
      if (months[nameMonth]) {
        months[nameMonth].lists.push(list)
      } else {
        months[nameMonth] = { lists: [list], date: list.createdAt }
      }
    }
  })
  let listByMonth = []
  Object.keys(months).forEach((key) => {
    listByMonth.push(months[key])
  })
  listByMonth.sort((a, b) => a.date - b.date)
  return listByMonth
})
