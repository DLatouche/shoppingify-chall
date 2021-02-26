import { getId, getInclude } from "../../utilities/helper"
import {
  ADD_LIST_ACTION,
  ADD_ITEM_TO_LIST,
  UPDATE_LIST,
  CREATE_EMPTY_LIST_ACTION,
  SET_LISTS_ACTION,
} from "../reducers/list.reducer"
import API from "../../utilities/API"

export const addListAction = (list) => async (dispatch) => {
  let result = await API.authRequest({ url: "lists", type: "POST", data: { list } })
  let newList = result.data.list
  newList.categories = []
  await dispatch({
    type: ADD_LIST_ACTION,
    payload: newList,
  })
  return newList
}

export const setListsAction = ({ lists }) => async (dispatch) => {
  await dispatch({
    type: SET_LISTS_ACTION,
    payload: lists,
  })
}

export const addItemToListAction = ({ item, list }) => async (dispatch) => {
  // check if the item category is already in the list
  let indexCategory = getInclude(list.categories, (category) => item.category.id === category.id)
  // category is in the list
  if (indexCategory >= 0) {
    let category = list.categories[indexCategory]
    let indexItem = getInclude(category.items, (listItem) => item.id === listItem.id)
    if (indexItem === -1) {
      list.categories[indexCategory].items.push({ ...item, quantity: 1 })
      let result = await API.authRequest({ url: "lists", type: "PATCH", data: { list } })
      let newList = result.data.list
      dispatch({
        type: ADD_ITEM_TO_LIST,
        payload: { item, list },
      })
      return { data: list, status: "OK", message: "" }
    } else {
      list.categories[indexCategory].items[indexItem].quantity += 1
      let result = await API.authRequest({ url: "lists", type: "PATCH", data: { list } })
      let newList = result.data.list
      dispatch({
        type: ADD_ITEM_TO_LIST,
        payload: { item, list },
      })
      return { data: list, status: "OK", message: "Item is already in the list." }
    }

    // category isn't in the list
  } else {
    // add the item into category
    list.categories.push({ ...item.category, items: [item] })
    let resultList = await API.authRequest({ url: "lists", type: "PATCH", data: { list } })
    let newList = resultList.data.list

    dispatch({
      type: ADD_ITEM_TO_LIST,
      payload: { item, list },
    })
    return { data: list, status: "OK", message: "" }
  }
}

export const updateListAction = (list) => async (dispatch) => {
  let result = await API.authRequest({ url: "lists", type: "PATCH", data: { list } })
  let newList = result.data.list
  await dispatch({
    type: UPDATE_LIST,
    payload: list,
  })
  return newList
}

export const createEmptyListAction = () => async (dispatch) => {
  let list = { id: getId(), name: "", state: "EDITING", categories: [], date: new Date() }
  let result = await API.authRequest({ url: "lists", type: "POST", data: { list } })
  let newList = result.data.list

  await dispatch({
    type: CREATE_EMPTY_LIST_ACTION,
    payload: newList,
  })
  return newList
}
