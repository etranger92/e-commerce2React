import {
    TROLLEY
} from "../Actions/types"

let trolleyUpdated = {
    payload: [],
};

const trolley = (state = trolleyUpdated, action) => {
    console.log(state, "this is your trolley state")
    //In case if users refresh the page with no changes, we want to prevent duplicated values
    var isItemAlreadyInArray = state.payload.some(item => {
        if (action.payload) {
            return item.id == action.payload.id
        } else return false
    });

    switch (action.type) {
        case TROLLEY.ADD_PRODUCT_TROLLEY:
            if (action.indice === true && !isItemAlreadyInArray) {
                return {
                    ...state,
                    payload: [...state.payload, action.payload]
                    //  payload: [
                    //   action.payload
                    // ]
                }
            }
            break;
        case TROLLEY.REMOVE_PRODUCT_TROLLEY:
            if (action.indice === false) {
                return {
                    ...state,
                    payload: state.payload.filter(item => item.id != action.id)
                }
            }
            case TROLLEY.UPDATE_QUANTITY:
                return {
                    ...state,
                    payload: state.payload.map((item, index) =>
                        item.id == action.id ? {
                            ...item,
                            quantitySelected: action.value
                        } : item
                    )
                }
                default:
                    return state;
    }
    return state
};

export default trolley;