import axios from "axios";
import { PRODUCTS_ACTION } from "../../constant/ActionConstant";
import { PRODUCT_API } from "../../constant/ApiContant";

export const productsGet = () => {
    return async (dispatch) => {
        const res = await axios.get(PRODUCT_API);
        dispatch({ type: PRODUCTS_ACTION.FETCH_PRODUCT, data: res.data })
    }
}

export const productAdd = (product) => {
    return async (dispatch) => {
        const res = await axios.post(PRODUCT_API, {
            ...product,
            createdAt: new Date().toLocaleString(),
            updatedAt: new Date().toLocaleString(),
            isDeleted: false,
            isVisible: false
        });

        dispatch({ type: PRODUCTS_ACTION.ADD_PRODUCT, data: res.data });
    };
};

export const productUpdate = (product, id) => {
    return async (dispatch) => {
        const res = await axios.put(`${PRODUCT_API}/${id}`, {
            ...product,
            updatedAt: new Date().toLocaleString()
        });

        dispatch({ type: PRODUCTS_ACTION.UPDATE_PRODUCT, data: res.data });
    };
};

export const productDelete = (id) => {
    return async (dispatch) => {
        const res = await axios.patch(`${PRODUCT_API}/${id}`, {
            isDeleted: true,
            isVisible: false,
            updatedAt: new Date().toLocaleString()
        });

        dispatch({ type: PRODUCTS_ACTION.DELETE_PRODUCT, data: res.data });
    };
};

export const productRecover = (id) => {
    return async (dispatch) => {
        const res = await axios.patch(`${PRODUCT_API}/${id}`, {
            isDeleted: false,
            updatedAt: new Date().toLocaleString()
        });

        dispatch({ type: PRODUCTS_ACTION.RECOVER_PRODUCT, data: res.data });
    };
};

export const productHide = (id) => {
    return async (dispatch) => {
        const res = await axios.patch(`${PRODUCT_API}/${id}`, {
            isVisible: false,
            updatedAt: new Date().toLocaleString()
        });

        dispatch({ type: PRODUCTS_ACTION.HIDE_PRODUCT, data: res.data });
    };
};

export const productShow = (id) => {
    return async (dispatch) => {
        const res = await axios.patch(`${PRODUCT_API}/${id}`, {
            isVisible: true,
            updatedAt: new Date().toLocaleString()
        });

        dispatch({ type: PRODUCTS_ACTION.SHOW_PRODUCT, data: res.data });
    };
};