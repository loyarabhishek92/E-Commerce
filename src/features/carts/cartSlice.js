import { getCartsFromLocal, removeCartsFromLocal, setCartsToLocal } from "@/local/local.js";
import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: 'cartSlice',
    initialState: {
        carts: getCartsFromLocal(),
    },

    reducers: {
        setCart: (state, action) => {

            const isExist = state.carts.find((cart) => cart.id === action.payload.id);
            if(isExist){
                state.carts = state.carts.map((cart) => cart.id === action.payload.id ? action.payload : cart);
            } else {
                state.carts.push(action.payload);
            }

            setCartsToLocal(state.carts);
        },

        removeCart: (state, action) => {
            state.carts = state.carts.filter(item => item.id !== action.payload);
            setCartsToLocal(state.carts);
        },

        clearCart: (state) => {
            state.carts = [];
            removeCartsFromLocal();
        },
    },
});


export const {setCart, clearCart, removeCart} = cartSlice.actions;