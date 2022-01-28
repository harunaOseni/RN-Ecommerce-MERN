import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import cartItems from "./Reducers/cartItems";

const reducers = combineReducers({
    cartItems,
});

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);

export default store;
