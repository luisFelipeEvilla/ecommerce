import Axios from 'axios';
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_ADD_ITEM_FAIL } from '../constants/cartConstants';
import Cookie from 'js-cookie';

const addToCart = (productId, qty) => async (dispatch, getState) => {
    try {
        const { data } = await Axios.get("/api/products/" + productId);
        dispatch({
            type: CART_ADD_ITEM, payload: {
                product: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                qty
            }
        })

        //save the cartItems at browser cookies
        const { cart: { cartItems } } = getState();
        Cookie.set("cartItems", JSON.stringify(cartItems));
    } catch (error) {
        dispatch({ type: CART_ADD_ITEM_FAIL, payload: error.message });
    }
}

const removeFromCart = (productId) => (dispatch, getState) => {
    dispatch({ type: CART_REMOVE_ITEM, payload: productId });
    //save the cartItems at browser cookies
    const { cart: { cartItems } } = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems));
}

export { addToCart, removeFromCart }