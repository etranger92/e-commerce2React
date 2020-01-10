import {
    FETCH_SHOES,
    TROLLEY,
    UPDATE_QUANTITY_PRODUCTS,
} from "./types";


export const fetchProductsPending = () => {
    return {
        type: FETCH_SHOES.FETCH_PRODUCTS_PENDING
    }
}

export const fetchProductsSuccess = (products) => {

    return {
        type: FETCH_SHOES.FETCH_PRODUCTS_SUCCESS,
        products: products
    }
}

export const fetchProductsError = (error) => {
    return {
        type: FETCH_SHOES.FETCH_PRODUCTS_ERROR,
        error: error
    }
}

export const updateProductsPending = () => {
    return {
        type: UPDATE_QUANTITY_PRODUCTS.UPDATE_QUANTITY_PENDING
    }
}

export const updateProductsSuccess = (products) => {

    return {
        type: UPDATE_QUANTITY_PRODUCTS.UPDATE_QUANTITY_SUCCESS,
        products: products
    }
}

export const updateProductsError = (error) => {
    return {
        type: UPDATE_QUANTITY_PRODUCTS.UPDATE_QUANTITY_ERROR,
        error: error
    }
}

export const addProductToTrolley = (id, indice) => {
    return {
        type: TROLLEY.ADD_PRODUCT_TROLLEY,
    }
}

export const removeProductFromTrolley = (id, indice) => {
    return {
        type: TROLLEY.REMOVE_PRODUCT_TROLLEY,
    }
}

export const updateQuantityProductsTrolley = (id, value) => {
    return {
        type: TROLLEY.UPDATE.QUANTITY,
    }
}