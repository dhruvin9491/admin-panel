import { toast } from "react-toastify";
import { PRODUCTS_ACTION } from "../../constant/ActionConstant";
import { STORAGE_KEYS } from "../../constant/StorageConstant";

const initState = {
    products: JSON.parse(localStorage.getItem(STORAGE_KEYS.PRODUCTS)) || []
}

export const productReducer = (state = initState, action) => {
    switch (action.type) {
        case PRODUCTS_ACTION.ADD_PRODUCT:
            return {
                ...state,
                products: [...state.products, action.data]
            };
        case PRODUCTS_ACTION.UPDATE_PRODUCT:
            return {
                ...state,
                products: state.products.map((product) =>
                    product.id === action.id
                        ? { ...product, ...action.data, updatedAt: new Date().toLocaleString() }
                        : product
                )
            }
        case PRODUCTS_ACTION.DELETE_PRODUCT:
            return {
                ...state,
                products: state.products.map((product) =>
                    product.id === action.id
                        ? { ...product, isDeleted: true, isVisible: false, updatedAt: new Date().toLocaleString() }
                        : product
                )
            };
        case PRODUCTS_ACTION.RECOVER_PRODUCT:
            return {
                ...state,
                products: state.products.map((product) =>
                    product.id === action.id
                        ? { ...product, isDeleted: false, updatedAt: new Date().toLocaleString() }
                        : product
                )
            };
        case PRODUCTS_ACTION.SHOW_PRODUCT:
            return {
                ...state,
                products: state.products.map((product) =>
                    product.id === action.id
                        ? { ...product, isVisible: true, updatedAt: new Date().toLocaleString() }
                        : product
                )
            };
        case PRODUCTS_ACTION.HIDE_PRODUCT:
            return {
                ...state,
                products: state.products.map((product) =>
                    product.id === action.id
                        ? { ...product, isVisible: false, updatedAt: new Date().toLocaleString() }
                        : product
                )
            };
        default:
            return state;
    }
}