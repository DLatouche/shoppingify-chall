import { combineReducers, createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { itemsReducer } from "../reducers/item.reducer"
console.log("index.js -> 5: itemsReducer", itemsReducer  )

const store = createStore(
	combineReducers({
		items: itemsReducer,
	}),
	composeWithDevTools(applyMiddleware(thunk))
)

export default store
