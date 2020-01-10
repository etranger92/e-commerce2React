import {
    FETCH_SHOES,
    UPDATE_QUANTITY_PRODUCTS
} from "../Actions/types";


const initialState = {
    pending: false,
    products: [],
    error: null
}

export const productsState = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SHOES.FETCH_PRODUCTS_PENDING:
            return {
                ...state,
                pending: true
            }
            case FETCH_SHOES.FETCH_PRODUCTS_SUCCESS:
                return {
                    ...state,
                    pending: false,
                        products: action.products
                }
                case FETCH_SHOES.FETCH_PRODUCTS_ERROR:
                    return {
                        ...state,
                        pending: false,
                            error: action.error
                    }
                    default:
                        return state;
    }
}

export const quantityUpdated = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_QUANTITY_PRODUCTS.UPDATE_QUANTITY_PENDING:
            return {
                ...state,
                pending: true
            }
            case UPDATE_QUANTITY_PRODUCTS.UPDATE_QUANTITY_SUCCESS:
                return {
                    ...state,
                    pending: false,
                        products: action.products
                }
                case UPDATE_QUANTITY_PRODUCTS.UPDATE_QUANTITY_ERROR:
                    return {
                        ...state,
                        pending: false,
                            error: action.error
                    }
                    default:
                        return state;
    }
}