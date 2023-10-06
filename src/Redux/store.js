import { configureStore } from "@reduxjs/toolkit"; 

import productsSlice from './Reducers/productsReducer.js';
import cartSlice from './Reducers/cartReducer.js';
export default configureStore({
    reducer: {
        products : productsSlice,
        cart : cartSlice,
    },
})