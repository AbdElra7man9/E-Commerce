import { createSlice } from "@reduxjs/toolkit";
const CartSlice = createSlice({
    name: 'Cart',
    initialState: {
        cart: [],
        success: null,
        error: null,
        loading: false
    },
    reducers: {
        Addtocart_Request(state, action) {
            state.cart = [];
            state.loading = true;
            state.success = null;
            state.error = false
        },
        Addtocart_Success(state, action) {
            state.cart = action.payload;
            state.loading = false;
            state.success = action.payload.msg;
            state.error = false
        },
        Addtocart_Fails(state, action) {
            state.cart = [];
            state.loading = false;
            state.success = false;
            state.error = action.payload.msg
        },
    }
})
export const CartActions = CartSlice.actions
export default CartSlice.reducer