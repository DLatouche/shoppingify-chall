import { getId, getInclude, include } from "../../utilities/helper"
import {
    ADD_LIST_ACTION, ADD_ITEM_TO_LIST
} from "../reducers/list.reducer"

export const addListAction = (list) => async (dispatch) => {
    let newList = { id: getId(), list }
    await dispatch({
        type: ADD_LIST_ACTION,
        payload: newList,
    })
    return newList
}


export const addItemToListAction = ({ item, list }) => async (dispatch) => {
    let indexCategory = getInclude(list.categories, category => item.category.id === category.id)
    if (indexCategory >= 0) {
        let category = list.categories[indexCategory]
        let indexItem = getInclude(category.items, listItem => item.id === listItem.id)
        if (indexItem === -1) {
            list.categories[indexCategory].items.push({ ...item, quantity: 1 })
            dispatch({
                type: ADD_ITEM_TO_LIST,
                payload: { item, list },
            })
            return { data: list, status: "OK", message: "" }
        } else {
            list.categories[indexCategory].items[indexItem].quantity += 1
            dispatch({
                type: ADD_ITEM_TO_LIST,
                payload: { item, list },
            })
            return { data: list, status: "OK", message: "Item is already in the list." }
        }
    } else {
        list.categories.push({ ...item.category })
        list.categories[list.categories.length - 1].items.push({ ...item, quantity: 1 })
        dispatch({
            type: ADD_ITEM_TO_LIST,
            payload: { item, list },
        })
        return { data: list, status: "OK", message: "" }
    }

}