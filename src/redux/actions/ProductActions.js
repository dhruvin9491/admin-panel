import { PRODUCTS_ACTION } from "../../constant/ActionConstant";

export const productAdd = (data) => {
    return { type: PRODUCTS_ACTION.ADD_PRODUCT, data }
}

export const productUpdate = (data, id) => {
    return { type: PRODUCTS_ACTION.UPDATE_PRODUCT, data, id }
}

export const productDelete = (id) => {
    return { type: PRODUCTS_ACTION.DELETE_PRODUCT, id }
}

export const productRecover = (id) => {
    return { type: PRODUCTS_ACTION.RECOVER_PRODUCT, id }
}

export const productShow = (id) => {
    return { type: PRODUCTS_ACTION.SHOW_PRODUCT, id }
}

export const productHide = (id) => {
    return { type: PRODUCTS_ACTION.HIDE_PRODUCT, id }
}
