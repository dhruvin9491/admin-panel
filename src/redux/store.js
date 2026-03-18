import { configureStore } from "@reduxjs/toolkit";
import { SLICE_NAME } from "../constant/ActionConstant";
import productSlice from "./slices/productSlice";

const store = configureStore({
    reducer : {
        [SLICE_NAME.PRODUCTS] : productSlice.reducer,
    }
});

export default store;