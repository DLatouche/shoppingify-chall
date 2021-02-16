
const initialState = "LIST"

export const SET_ASIDE_ACTION = "SET_ASIDE_ACTION"

export function asideReducer(state = initialState, action) {
    switch (action.type) {
        case SET_ASIDE_ACTION:
            return action.payload
        default:
            return state
    }
}