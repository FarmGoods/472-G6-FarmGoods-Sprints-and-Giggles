import { createSlice} from '@reduxjs/toolkit'

const initialState = {
    cart: [],
    error: null
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        initializeCart: (state, action) => {
            state.cart = action.payload;
        },
        addToCart: (state, action) => {
            state.cart.push(action.payload);
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload)
        },
        increaseQuantity: (state, action) => {
            state.cart[action.payload].quantity += 1;
        },
        decreaseQuantity: (state, action) => {
            state.cart[action.payload].quantity -= 1;
        },
        clearCard: (state) => {
            state.cart = [];
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    },
})
  
export const {
    initializeCart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCard,
    setLoading,
    setError
} = cartSlice.actions
  
  
export const selectCart = (state) => state.cart
  
export default cartSlice.reducer