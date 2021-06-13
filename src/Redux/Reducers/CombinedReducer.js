import { combineReducers } from "redux";
import { fetchCryptoDataReducer } from "./fetchCryptoDataReducer";
const rootReducer = combineReducers({
  fetchCryptoDataReducer,
});

export default rootReducer;
