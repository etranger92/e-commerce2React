import {
    combineReducers
} from 'redux';

import {
    persistReducer
} from "redux-persist";
//tell to redux you want want to use your storage as default

import storage from "redux-persist/lib/storage";
// or session storage: diff between them; if the user closes his windows all datas are deleted but with local storage they are saved.
//import sessionStorage from "redux-persist/lib/storage";

import filter from "./filter";
import {
    productsState,
    quantityUpdated
} from "./products";

import trolley from "./trolley";

//Will define which reducer we want then to be persisted.
const persistConfig = {
    key: "root",
    storage,
    whitelist: ["bag", "trolley"]
}

const allReducers = combineReducers({
    filter: filter,
    products: productsState,
    quantityUpdated: quantityUpdated,
    trolley: trolley
})

export default (persistReducer(persistConfig, allReducers))
//export default allReducers