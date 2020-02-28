import {
    fetchProductsPending,
    fetchProductsSuccess,
    fetchProductsError,
    updateProductsPending,
    updateProductsSuccess,
    updateProductsError
} from "./shoes";

//This is the middlewar that will play a role between the initial action and the reducer.
//In order to work we need to import and set thunk in the app.js file. 
// You need to import fetchProducts into the component that U want to use.
/*We still need to use const mapDispatchToProps = dispatch => bindActionCreators({
    fetchProducts: fetchProducts
}, dispatch)
}*/
export const fetchProducts = () => {
    return dispatch => {

        dispatch(fetchProductsPending());
        fetch("/.netlify/functions/server/products/shoes", {
                method: 'GET'
            })
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    throw (res.error);
                }
                dispatch(fetchProductsSuccess(res))
                return res;
            })
            .catch(error => {
                dispatch(fetchProductsError(error));
            })
    }
}
export const updateQuantityProducts = (id, quantityOut) => {
    return dispatch => {
        dispatch(updateProductsPending());
        fetch("/.netlify/functions/server/products/shoes/update" , {
                method: 'POST',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    quantity: quantityOut,
                    id:id
                })
            })
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    throw (res.error);
                }
                dispatch(updateProductsSuccess(res))
                return res;
            })
            .catch(error => {
                dispatch(updateProductsError(error));
            })
    }
}