import { getId } from "../../utilities/helper"
import {
    ADD_LIST_ACTION,
} from "../reducers/list.reducer"

export const addListAction = (list) => async (dispatch) => {
    let newList = { id: getId(), item }
    await dispatch({
        type: ADD_LIST_ACTION,
        payload: newList,
    })
    return newList
}
