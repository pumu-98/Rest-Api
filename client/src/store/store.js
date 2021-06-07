import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { ProductDetailsReducer, productListReducer } from '../reducers/productReducer';
import { cartReducer } from '../reducers/cartReducer';
import { userDetailsReducer, userRegisterReducer, userSigninReducer, userUpdateProfileReducer } from '../reducers/userReducer';
import { orderCreateReducer, orderDetailsReducer, orderMineListReducer} from '../reducers/orderReducer';


const initialState = {
     
    userSignin: {
        userInfo: localStorage.getItem('userInfo') 
            ? JSON.parse(localStorage.getItem('userInfo')) 
            : null
     
    }
};
 
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: ProductDetailsReducer,
    cart:cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderMineList: orderMineListReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer
});

 
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(
    reducer, 
    initialState, 
    composeEnhancer(applyMiddleware(thunk))
);

export default store;