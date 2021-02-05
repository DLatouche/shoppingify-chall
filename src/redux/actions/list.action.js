import { getId, getInclude, include } from "../../utilities/helper"
import {
    ADD_LIST_ACTION, ADD_ITEM_TO_LIST, UPDATE_LIST
} from "../reducers/list.reducer"

export const addListAction = (list) => async (dispatch) => {
    let newList = { ...list, id: getId() }
    await dispatch({
        type: ADD_LIST_ACTION,
        payload: newList,
    })
    return newList
}


export const addItemToListAction = ({ item, list }) => async (dispatch) => {
    // check if the item category is already in the list
    let indexCategory = getInclude(list.categories, category => item.category.id === category.id)

    // category is in the list
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

        // category isn't in the list
    } else {

        // add the category
        list.categories.push({ ...item.category, items: [] })

        // add the item into category
        list.categories[list.categories.length - 1].items.push({ ...item, quantity: 1 })

        dispatch({
            type: ADD_ITEM_TO_LIST,
            payload: { item, list },
        })
        return { data: list, status: "OK", message: "" }
    }

}

export const updateListAction = (list) => async (dispatch) => {
    await dispatch({
        type: UPDATE_LIST,
        payload: list,
    })
    return list
}
