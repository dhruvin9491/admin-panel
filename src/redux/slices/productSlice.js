import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc, collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { PRODUCTS_ACTION, SLICE_NAME } from "../../constant/ActionConstant";
import { PROMISE_PHASE } from "../../constant/CommonConstant";
import { addData, getData } from "../../helper/sliceHelper";

export const productsGet = createAsyncThunk(PRODUCTS_ACTION.FETCH, async () => {
    const snapDocRef = await getDocs(collection(db, SLICE_NAME.PRODUCTS));
    return snapDocRef.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
});

export const productAdd = createAsyncThunk(PRODUCTS_ACTION.ADD, async (product) => {
    const payload = {
        ...product,
        createdAt: new Date().toLocaleString(),
        updatedAt: new Date().toLocaleString(),
        isDeleted: false,
        isVisible: false
    };
    const docRef = await addDoc(collection(db, SLICE_NAME.PRODUCTS), payload);
    return { id: docRef.id, ...payload };
});

export const productUpdate = createAsyncThunk(PRODUCTS_ACTION.UPDATE, async ({ product, id }) => {
    const docRef = doc(db, SLICE_NAME.PRODUCTS, id);
    const updatedData = {
        ...product,
        updatedAt: new Date().toLocaleString()
    };
    await updateDoc(docRef, updatedData);
    return { id, ...updatedData };
});

export const productDelete = createAsyncThunk(PRODUCTS_ACTION.DELETE, async (id) => {
    const docRef = doc(db, SLICE_NAME.PRODUCTS, id);
    const updatedData = {
        isDeleted: true,
        isVisible: false,
        updatedAt: new Date().toLocaleString()
    };
    await updateDoc(docRef, updatedData);
    return { id, ...updatedData };
});

export const productRecover = createAsyncThunk(PRODUCTS_ACTION.RECOVER, async (id) => {
    const docRef = doc(db, SLICE_NAME.PRODUCTS, id);
    const updatedData = {
        isDeleted: false,
        updatedAt: new Date().toLocaleString()
    };
    await updateDoc(docRef, updatedData);
    return { id, ...updatedData };
});

export const productHide = createAsyncThunk(PRODUCTS_ACTION.HIDE, async (id) => {
    const docRef = doc(db, SLICE_NAME.PRODUCTS, id);
    const updatedData = {
        isVisible: false,
        updatedAt: new Date().toLocaleString()
    };
    await updateDoc(docRef, updatedData);
    return { id, ...updatedData };
});

export const productShow = createAsyncThunk(PRODUCTS_ACTION.SHOW, async (id) => {
    const docRef = doc(db, SLICE_NAME.PRODUCTS, id);
    const updatedData = {
        isVisible: true,
        updatedAt: new Date().toLocaleString()
    };
    await updateDoc(docRef, updatedData);
    return { id, ...updatedData };
});

const mergeUpdate = (state, action) => {
    const index = state.list.findIndex((item) => item.id === action.payload.id);
    if (index !== -1) {
        state.list[index] = {
            ...state.list[index],
            ...action.payload
        };
    }
};

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
            .addCase(productUpdate.fulfilled, mergeUpdate)
            .addCase(productDelete.fulfilled, mergeUpdate)
            .addCase(productRecover.fulfilled, mergeUpdate)
            .addCase(productHide.fulfilled, mergeUpdate)
            .addCase(productShow.fulfilled, mergeUpdate)
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
            );
    }
});

export default productSlice;