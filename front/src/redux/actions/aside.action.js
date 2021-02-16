import { getId } from "../../utilities/helper"
import {
    SET_ASIDE_ACTION,
} from "../reducers/aside.reducer"

export const setAsideAction = (aside) => async (dispatch) => {
    await dispatch({
        type: SET_ASIDE_ACTION,
        payload: aside,
    })
    return aside
}
