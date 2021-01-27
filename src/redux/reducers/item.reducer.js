const initialState = []

export const ADD_ITEM_ACTION = "ADD_ITEM_ACTION"
export const UPDATE_ITEM_ACTION = "UPDATE_ITEM_ACTION"
export const DELETE_ITEM_ACTION = "DELETE_ITEM_ACTION"
export const DELETE_MULTI_ITEM_ACTION = "DELETE_MULTI_ITEM_ACTION"
export const SET_ITEMS_ACTION = "SET_ITEMS_ACTION"

export function itemsReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_ITEM_ACTION:
            return [...state, { ...action.payload }]
        case SET_ITEMS_ACTION:
            return [...action.payload]
        case UPDATE_ITEM_ACTION:
            return state.map((item) => {
                if (item.id === action.payload.id) {
                    return { ...item, ...action.payload }
                } else {
                    return item
                }
            })
        case DELETE_ITEM_ACTION:
            return state.filter((item) => item.id !== action.payload)
        case DELETE_MULTI_ITEM_ACTION:
            return state.filter((item) => !action.payload.includes(item.id))
        default:
            return state
    }
}