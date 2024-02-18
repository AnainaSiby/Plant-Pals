import { combineReducers } from "redux";
import commonReducer from "./commonReducer";

export const appReducer = combineReducers({
    commonReducer,
})