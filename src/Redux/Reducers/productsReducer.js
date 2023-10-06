import { createSlice } from "@reduxjs/toolkit";;

const productsSlice = createSlice({
    name: "productsAll",
    initialState: {
        productsAll : []
    },
    reducers : {
        allProducts : (state, action) => {
            state.productsAll = action.payload
        }
        
    }
})
// export actions
export const {allProducts} = productsSlice.actions;
// export the productsSlice reducer
export default productsSlice.reducer