import { combineReducers, createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { categoriesReducer } from "../reducers/category.reducer"
import { itemsReducer } from "../reducers/item.reducer"
import { listsReducer } from "../reducers/list.reducer"
import { asideReducer } from "../reducers/aside.reducer"

const store = createStore(
	combineReducers({
		categories: categoriesReducer,
		items: itemsReducer,
		lists: listsReducer,
		aside: asideReducer,
	}),
	composeWithDevTools(applyMiddleware(thunk))
)

export default store
