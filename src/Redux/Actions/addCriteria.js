import {
    FILTER_CRITERIA
} from "./types";

//Define what type of actions you would like to do with the possibility of taking arguments. 
//You don't need to link to your reducer it will be done automatically. 


export const genderCriteria = (value, indice) => {
    return {
        type: FILTER_CRITERIA.FILTER_PRODUCTS_BY_GENDER,
        payload: value,
        indice: indice
    }
}

export const sizeCriteria = (value, indice) => {
    return {
        type: FILTER_CRITERIA.FILTER_PRODUCTS_BY_SIZE,
        payload: value,
        indice: indice
    }
}

export const colorCriteria = (value, indice) => {
    return {
        type: FILTER_CRITERIA.FILTER_PRODUCTS_BY_COLOR,
        payload: value,
        indice: indice
    }
}

export const styleCriteria = (value, indice) => {
    return {
        type: FILTER_CRITERIA.FILTER_PRODUCTS_BY_STYLE,
        payload: value,
        indice: indice
    }
}