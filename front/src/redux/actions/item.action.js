import { getId } from "../../utilities/helper"
import API from "../../utilities/API"
import {
  ADD_ITEM_ACTION,
  DELETE_ITEM_ACTION,
  DELETE_MULTI_ITEM_ACTION,
  SET_ITEMS_ACTION,
  UPDATE_ITEM_ACTION,
} from "../reducers/item.reducer"

export const addItemAction = ({ item }) => async (dispatch) => {
  let result = await API.authRequest({ url: "items", type: "POST", data: { item } })
  let newItem = result.data.item
  await dispatch({
    type: ADD_ITEM_ACTION,
    payload: newItem,
  })
  return newItem
}

export const deleteItemAction = (item) => async (dispatch) => {
  let result = await API.authRequest({ url: "items", type: "DELETE", data: { item } })
  dispatch({
    type: DELETE_ITEM_ACTION,
    payload: item.id,
  })
}

export const updateItemAction = (item) => async (dispatch) => {
  let result = await API.authRequest({ url: "items", type: "PATCH", data: { item } })
  let newItem = result.data.item
  dispatch({
    type: UPDATE_ITEM_ACTION,
    payload: { ...newItem },
  })
  return newItem
}

export const setItemsAction = ({ items }) => async (dispatch) => {
  dispatch({
    type: SET_ITEMS_ACTION,
    payload: items,
  })
}
