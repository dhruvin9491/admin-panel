import { createStore } from "redux";
import { productReducer } from "./reducers/ProductReducer";
import { STORAGE_KEYS } from "../constant/StorageConstant";

const store = createStore(productReducer);

store.subscribe(() => {
    const state = store.getState();

    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(state.products));
});

export default store;