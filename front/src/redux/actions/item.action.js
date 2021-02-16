import { getId } from "../../utilities/helper"
import {
	ADD_ITEM_ACTION,
	DELETE_ITEM_ACTION,
	DELETE_MULTI_ITEM_ACTION,
	SET_ITEMS_ACTION,
	UPDATE_ITEM_ACTION,
} from "../reducers/item.reducer"

export const addItemAction = ({item}) => async (dispatch) => {
	let newItem = {...item,  id: getId() }
	await dispatch({
		type: ADD_ITEM_ACTION,
		payload: newItem,
	})
	return newItem
}

export const deleteItemAction = (item) => async (dispatch) => {
	dispatch({
		type: DELETE_ITEM_ACTION,
		payload: item.id,
	})
}

export const updateItemAction = (item) => async (dispatch) => {
	let newItem = { id: getId(), item }
	dispatch({
		type: UPDATE_ITEM_ACTION,
		payload: { ...newItem },
	})
}

export const deleteMultiItemAction = (ids) => async (dispatch) => {
	dispatch({
		type: DELETE_MULTI_ITEM_ACTION,
		payload: ids,
	})
}

export const setItems = ({ items }) => async (dispatch) => {
	dispatch({
		type: SET_ITEMS_ACTION,
		payload: items,
	})
}
