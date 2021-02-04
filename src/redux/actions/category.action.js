import { getId } from "../../utilities/helper"
import {
    ADD_CATEGORY_ACTION,
} from "../reducers/category.reducer"

export const addCategoryAction = ({ category }) => async (dispatch) => {
    let newCategory = { id: getId(), name: category.name }
    await dispatch({
        type: ADD_CATEGORY_ACTION,
        payload: newCategory,
    })
    return newCategory
}
