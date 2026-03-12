import { PRODUCTS_ACTION } from "../../constant/ActionConstant";

const initState = {
    list: []
};

export const productReducer = (state = initState, action) => {

    switch (action.type) {
        case PRODUCTS_ACTION.FETCH_PRODUCT:
            return {
                ...state,
                list: action.data
            };
        case PRODUCTS_ACTION.ADD_PRODUCT:
            return {
                ...state,
                list: [...state.list, action.data]
            };
        case PRODUCTS_ACTION.UPDATE_PRODUCT:
        case PRODUCTS_ACTION.DELETE_PRODUCT:
        case PRODUCTS_ACTION.RECOVER_PRODUCT:
        case PRODUCTS_ACTION.SHOW_PRODUCT:
        case PRODUCTS_ACTION.HIDE_PRODUCT:
            return {
                ...state,
                list: state.list.map((product) => product.id === action.data.id ? action.data : product)
            };
        default:
            return state;
    }
};