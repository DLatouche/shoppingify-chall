import { lists } from "../data"

const initialState = lists

export const ADD_LIST_ACTION = "ADD_LIST_ACTION"

export function listsReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_LIST_ACTION:
            return [...state, { ...action.payload }]
        default:
            return state
    }
}