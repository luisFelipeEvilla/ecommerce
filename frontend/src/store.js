import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { productListReducer, productDetailsReducer, productSaveReducer, productDeleteReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import { siginUserReducer, signupUserReducer, singoutUserReducer } from './reducers/UserReducers';
import Cookie from 'js-cookie';

// load cartItems from cookies
const cartItems = Cookie.getJSON("cartItems") || [];
const userInfo =  Cookie.getJSON("userInfo") || null;

/**
 * @todo combine userSignin userSignup and userSignout in one reducer with combine reducers
 */

const initialState = { cart: { cartItems }, userSignin: { userInfo }};
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignin: siginUserReducer,
    userSignup: signupUserReducer,
    userSignout: singoutUserReducer,
    productSave: productSaveReducer,
    productDelete: productDeleteReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 }) || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;