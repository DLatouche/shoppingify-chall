import { TOGGLE_DRAWER_ACTION } from "../reducers/drawer.reducer"

export const toggleDrawerAction = () => async (dispatch) => {
    await dispatch({
        type: TOGGLE_DRAWER_ACTION,
        payload: null,
    })
}
