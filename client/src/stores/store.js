import { configureStore } from '@reduxjs/toolkit';
import bannerReducer from '../reducers/bannerReducer';
import productsReducer from '../reducers/productsReducer';
import productDetailReducer from '../reducers/productDetailReducer';
import cartReducer from '../reducers/cartReducer';
import signUpReducer from '../reducers/signUpReducer';
import loginReducer from '../reducers/loginReducer';
import usersReducer from '../reducers/usersReducer';
import adminProductsReducer from '../reducers/adminProductsReducer';
import categoryReducer from '../reducers/categoryReducer';
import orderReducer from '../reducers/orderReducer';



export const store = configureStore({
    reducer: {
        banners: bannerReducer,
        products: productsReducer,
        product: productDetailReducer,
        cartInfo: cartReducer,
        signUp: signUpReducer,
        login: loginReducer,
        users: usersReducer,
        adminProducts: adminProductsReducer,
        categories: categoryReducer,
        orders: orderReducer,
    }
});