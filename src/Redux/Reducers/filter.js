import {
    breakStatement
} from "@babel/types";

import {
    FILTER_CRITERIA
} from "../Actions/types";

//This is the object initial where the function bellow will fill up.
let filterCriteria = {
    gender: [],
    color: [],
    style: []
}

//It will define the filterCriteria depending of the action called. You can add your own value or use arguments from your action if you have some.
const filter = (state = filterCriteria, action) => {
    switch (action.type) {
        case FILTER_CRITERIA.FILTER_PRODUCTS_BY_GENDER:
            if (action.indice === true) {
                return {
                    ...state,
                    gender: [...state.gender, action.value]
                }
            } else {
                return {
                    ...state,
                    gender: state.gender.filter(item => item !== action.value)
                }
            }
            case FILTER_CRITERIA.FILTER_PRODUCTS_BY_COLOR:
                if (action.indice === true) {
                    return {
                        ...state,
                        color: [...state.color, action.value]
                    }
                } else {
                    return {
                        ...state,
                        color: state.color.filter(item => item !== action.value)
                    }
                }
                case FILTER_CRITERIA.FILTER_PRODUCTS_BY_STYLE:
                    if (action.indice === true) {
                        return {
                            ...state,
                            style: [...state.style, action.value]
                        }
                    } else {
                        return {
                            ...state,
                            style: state.style.filter(item => item !== action.value)
                        }
                    }
                    default:
                        return state;
    }
    return state

}


export default filter