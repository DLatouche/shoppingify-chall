import {
    SET_CURRENT_ITEM_ACTION,
} from "../reducers/currentItem.reducer"

export const setCurrentItemReducer = (item) => async (dispatch) => {
    await dispatch({
        type: SET_CURRENT_ITEM_ACTION,
        payload: item,
    })
    return item
}
