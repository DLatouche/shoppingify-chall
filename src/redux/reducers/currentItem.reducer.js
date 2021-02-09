
const initialState = { id: null }

export const SET_CURRENT_ITEM_ACTION = "SET_CURRENT_ITEM_ACTION"

export function currentItemReducer(state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_ITEM_ACTION:
            return action.payload
        default:
            return state
    }
}