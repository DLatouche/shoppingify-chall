import { categories } from "../data"

const initialState = categories

export const ADD_CATEGORY_ACTION = "ADD_CATEGORY_ACTION"
export const ADD_ITEM_TO_CATEGORY_ACTION = "ADD_ITEM_TO_CATEGORY_ACTION"
export const SET_CATEGORIES_ACTION = "SET_CATEGORIES_ACTION"

export function categoriesReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_CATEGORY_ACTION:
      return [...state, { ...action.payload }]
    case SET_CATEGORIES_ACTION:
      return [...action.payload]
    // case ADD_ITEM_TO_CATEGORY_ACTION:
    //   return state.map((category) => {
    //     if (category.id === action.payload.category.id) {
    //       console.log("%ccategory.reducer.js -> 18 ORANGE: category", "background: #607d8b; color:#FFFFFF", category)
    //       return { ...category, items: [...category.items, action.payload.item] }
    //     } else {
    //       return category
    //     }
    //   })
    default:
      return state
  }
}
