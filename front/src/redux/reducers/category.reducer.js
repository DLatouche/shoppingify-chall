import { categories } from "../data"

const initialState = categories

export const ADD_CATEGORY_ACTION = "ADD_CATEGORY_ACTION"

export function categoriesReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_CATEGORY_ACTION:
            return [...state, { ...action.payload }]
        default:
            return state
    }
}