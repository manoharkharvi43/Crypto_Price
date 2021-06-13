import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../Reducers/CombinedReducer";

export const store = createStore(rootReducer, applyMiddleware(thunk));
