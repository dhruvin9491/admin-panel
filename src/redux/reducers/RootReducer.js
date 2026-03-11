import { combineReducers } from "redux";
import { productReducer } from "./ProductReducer";

export const rootReducer = combineReducers({
    products: productReducer
})