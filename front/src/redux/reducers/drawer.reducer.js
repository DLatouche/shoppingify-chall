
const initialState = false

export const TOGGLE_DRAWER_ACTION = "TOGGLE_DRAWER_ACTION"

export function drawerReducer(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_DRAWER_ACTION:
            return !state
        default:
            return state
    }
}