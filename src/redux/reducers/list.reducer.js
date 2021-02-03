import { lists } from "../data"

const initialState = lists

export const ADD_LIST_ACTION = "ADD_LIST_ACTION"
export const ADD_ITEM_TO_LIST = "ADD_ITEM_TO_LIST"

export function listsReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_LIST_ACTION:
            return [...state, { ...action.payload }]
        case ADD_ITEM_TO_LIST:
            return state.map((list) => {
                if (list.id === action.payload.list.id) {
                    return { ...list, ...action.payload }
                } else {
                    return list
                }
            })
        default:
            return state
    }
}