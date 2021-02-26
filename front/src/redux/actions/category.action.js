import { getId } from "../../utilities/helper"
import { ADD_CATEGORY_ACTION, SET_CATEGORIES_ACTION, ADD_ITEM_TO_CATEGORY_ACTION } from "../reducers/category.reducer"
import API from "../../utilities/API"
export const addCategoryAction = ({ category }) => async (dispatch) => {
  let result = await API.authRequest({ url: "categories", type: "POST", data: { category } })
  let newCategory = result.data.category
  await dispatch({
    type: ADD_CATEGORY_ACTION,
    payload: newCategory,
  })
  return newCategory
}

export const setCategoriesAction = ({ categories }) => async (dispatch) => {
  await dispatch({
    type: SET_CATEGORIES_ACTION,
    payload: categories,
  })
}

// export const addItemToCategoriesAction = ({ category, item }) => async (dispatch) => {
//   await dispatch({
//     type: ADD_ITEM_TO_CATEGORY_ACTION,
//     payload: { category, item },
//   })
// }
