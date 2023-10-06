import { createSlice } from "@reduxjs/toolkit";;

const cartSlice = createSlice({
    name: "cartItems",
    initialState: {
      cart_data : {
        cart_items : [],
        cart_Amount : 0,
        cart_qty : 0
    }
   },
    reducers : {
        addItem : (state, action) => { 
            const index = state.cart_data.cart_items.findIndex( (item) => item.product_ID === action.payload.product_ID)
            
            if(index === -1) {
                const itemToAdd = {...action.payload}
                itemToAdd.product_stock = itemToAdd.product_stock - 1
               
                let price = itemToAdd.product_price 
                
                if(itemToAdd.product_discount !== 0) {
                 price = itemToAdd.product_price - (itemToAdd.product_price * (itemToAdd.product_discount / 100))
                }
                state.cart_data.cart_items.push({...itemToAdd, total : price})
                state.cart_data.cart_Amount = state.cart_data.cart_Amount + price  
                state.cart_data.cart_qty = state.cart_data.cart_qty + 1  
            }
            // else
            // console.log("item already added")
        },

        removeItem : (state, action) => { 
        const index = state.cart_data.cart_items.findIndex( (item) => item.product_ID === action.payload.product_ID) 

        if(index !== -1) { 
            const tempCart = state.cart_data.cart_items.filter( el => el.product_ID !== action.payload.product_ID)

                const itemToRemove = state.cart_data.cart_items[index]
                state.cart_data.cart_Amount = state.cart_data.cart_Amount - itemToRemove.total  
                state.cart_data.cart_qty = state.cart_data.cart_qty - itemToRemove.qty
                state.cart_data.cart_items = tempCart
        }
        // else
        // console.log("item not in cart")
        },

        increaseQty : (state, action) => { 

            const index = state.cart_data.cart_items.findIndex( (item) => item.product_ID === action.payload.product_ID)
            
            if(index !== -1 && action.payload.qty < 4) {
                const itemToPlus = {...action.payload}
                
                let price = itemToPlus.product_price 
                
                if(itemToPlus.product_discount !== 0) {
                 price = itemToPlus.product_price - (itemToPlus.product_price * (itemToPlus.product_discount / 100))
                }

                state.cart_data.cart_items[index].qty = state.cart_data.cart_items[index].qty + 1
                state.cart_data.cart_items[index].total = state.cart_data.cart_items[index].total + price
                state.cart_data.cart_items[index].product_stock = state.cart_data.cart_items[index].product_stock - 1

                state.cart_data.cart_Amount = state.cart_data.cart_Amount + price  
                state.cart_data.cart_qty = state.cart_data.cart_qty + 1  
              }
            // else
            // console.log("item not in cart")

        }, 
        decreaseQty : (state, action) => { 

            const index = state.cart_data.cart_items.findIndex( (item) => item.product_ID === action.payload.product_ID)
            
            if(index !== -1 && action.payload.qty > 1) {
                const itemToMinus = {...action.payload}
                
                let price = itemToMinus.product_price 
                
                if(itemToMinus.product_discount !== 0) {
                 price = itemToMinus.product_price - (itemToMinus.product_price * (itemToMinus.product_discount / 100))
                }

                state.cart_data.cart_items[index].qty = state.cart_data.cart_items[index].qty - 1
                state.cart_data.cart_items[index].total = state.cart_data.cart_items[index].total - price
                state.cart_data.cart_items[index].product_stock = state.cart_data.cart_items[index].product_stock + 1

                state.cart_data.cart_Amount = state.cart_data.cart_Amount - price  
                state.cart_data.cart_qty = state.cart_data.cart_qty - 1  

              }
            // else
            // console.log("item not in cart")
        }, 
        clearCart : (state, action) => {  
                state.cart_data = {
                    cart_items : [],
                    cart_Amount : 0,
                    cart_qty : 0
                }
        }

        
    }
})
// export actions
export const {addItem, removeItem, increaseQty, decreaseQty, clearCart} = cartSlice.actions;
// export the cartSlice reducer
export default cartSlice.reducer