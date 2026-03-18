import axios from "axios";
import { PRODUCT_API } from "../../constant/ApiContant";
import { PRODUCTS_ACTION, SLICE_NAME } from "../../constant/ActionConstant";
import { addData, getData, updateData } from "../../helper/sliceHelper";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PROMISE_PHASE } from "../../constant/CommonConstant";

export const productsGet = createAsyncThunk(PRODUCTS_ACTION.FETCH, async () => {
    const res = await axios.get(PRODUCT_API);
    return res.data;
});

export const productAdd = createAsyncThunk(PRODUCTS_ACTION.ADD, async (product) => {
    const res = await axios.post(PRODUCT_API, {
        ...product,
        createdAt: new Date().toLocaleString(),
        updatedAt: new Date().toLocaleString(),
        isDeleted: false,
        isVisible: false
    });
    return res.data;
});

export const productUpdate = createAsyncThunk(PRODUCTS_ACTION.UPDATE, async ({ product, id }) => {
    const res = await axios.patch(`${PRODUCT_API}/${id}`, {
        ...product,
        updatedAt: new Date().toLocaleString()
    });
    return res.data;
});

export const productDelete = createAsyncThunk(PRODUCTS_ACTION.DELETE, async (id) => {
    const res = await axios.patch(`${PRODUCT_API}/${id}`, {
        isDeleted: true,
        isVisible: false,
        updatedAt: new Date().toLocaleString()
    });
    return res.data;
});

export const productRecover = createAsyncThunk(PRODUCTS_ACTION.RECOVER, async (id) => {
    const res = await axios.patch(`${PRODUCT_API}/${id}`, {
        isDeleted: false,
        updatedAt: new Date().toLocaleString()
    });
    return res.data;
});

export const productHide = createAsyncThunk(PRODUCTS_ACTION.HIDE, async (id) => {
    const res = await axios.patch(`${PRODUCT_API}/${id}`, {
        isVisible: false,
        updatedAt: new Date().toLocaleString()
    });
    return res.data;
});

export const productShow = createAsyncThunk(PRODUCTS_ACTION.SHOW, async (id) => {
    const res = await axios.patch(`${PRODUCT_API}/${id}`, {
        isVisible: true,
        updatedAt: new Date().toLocaleString()
    });
    return res.data;
});

const productSlice = createSlice({
    name: SLICE_NAME.PRODUCTS,
    initialState: {
        list: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(productsGet.fulfilled, getData)
            .addCase(productAdd.fulfilled, addData)
            .addCase(productUpdate.fulfilled, updateData)
            .addCase(productDelete.fulfilled, updateData)
            .addCase(productRecover.fulfilled, updateData)
            .addCase(productHide.fulfilled, updateData)
            .addCase(productShow.fulfilled, updateData)

            .addMatcher(
                (action) =>
                    action.type.startsWith(SLICE_NAME.PRODUCTS) &&
                    action.type.endsWith(PROMISE_PHASE.PENDING),
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )
            .addMatcher(
                (action) =>
                    action.type.startsWith(SLICE_NAME.PRODUCTS) &&
                    action.type.endsWith(PROMISE_PHASE.REJECTED),
                (state, action) => {
                    state.loading = false;
                    state.error = action.error.message;
                }
            )
            .addMatcher(
                (action) =>
                    action.type.startsWith(SLICE_NAME.PRODUCTS) &&
                    action.type.endsWith(PROMISE_PHASE.FULFILLED),
                (state) => {
                    state.loading = false;
                }
            )
    }
})

export default productSlice;