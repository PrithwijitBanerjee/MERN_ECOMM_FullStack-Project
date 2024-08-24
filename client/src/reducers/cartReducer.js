import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { STATUSES } from '../utils/statusObj';
import { axiosInstance } from '../apiUrl/axiosInstance';
import { toast } from 'react-toastify';

const initialState = {
    status: STATUSES.IDLE,
    carts: [],
    error: null,
    subTotal: 0
};

// thunk middlewares ...
export const getAllCarts = createAsyncThunk('cart/product/ecomm', async (_, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.get('carts/list');
        return data;
    } catch (error) {
        return rejectWithValue(error?.message);
    }
});

// add item to cart ...
export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async ({ productId, quantity }, { rejectWithValue }) => {
        try {
            const { data } = await axiosInstance.post('carts/add', { productId, quantity });
            if (data?.success) {
                toast.success(data?.message, { theme: 'colored' });
                return { productId, quantity }; // Pass relevant data to update the state
            }
        } catch (error) {
            toast.error(error?.message, { theme: 'colored' });
            return rejectWithValue(error?.message);
        }
    }
);

// remove items from cart ...
export const removeItemCart = createAsyncThunk(
    'cart/removeItem',
    async (productId, { rejectWithValue }) => {
        try {
            const { data } = await axiosInstance.delete('carts/remove-item-cart', {
                data: { productId: `${productId}` } // Pass the productId in the request body
            });

            if (data?.success) {
                toast.success(data?.message, { theme: 'colored' });
                return productId; // Return the removed productId to update the state
            }
        } catch (error) {
            toast.error(error?.message, { theme: 'colored' });
            return rejectWithValue(error?.message);
        }
    }
);


// cart reducer ...
const cartReducer = createSlice({
    name: 'ecomm/product/cart',
    initialState,
    extraReducers: builder => {
        builder.addCase(getAllCarts.pending, state => {
            state.status = STATUSES.LOADING;
        })
            .addCase(getAllCarts.fulfilled, (state, { payload }) => {
                state.status = STATUSES.IDLE;
                if (payload?.success) {
                    state.carts = payload?.payload?.items;
                    state.subTotal = payload?.payload?.subTotal;
                }
            })
            .addCase(getAllCarts.rejected, (state, { payload }) => {
                state.status = STATUSES.ERROR;
                state.error = payload;
            })
            .addCase(addToCart.pending, state => {
                state.status = STATUSES.LOADING;
            })
            .addCase(addToCart.fulfilled, (state, { payload }) => {
                state.status = STATUSES.IDLE;
                const { productId, quantity } = payload;
                const cartItem = state.carts.find(item => item.productId._id === productId);
                if (cartItem) {
                    cartItem.quantity = quantity; // Update the quantity of the item in the cart
                }
                // Recalculate the subTotal
                state.subTotal = state.carts.reduce((total, cartItem) => total + cartItem.productId.price * cartItem.quantity, 0);
            })
            .addCase(addToCart.rejected, (state, { payload }) => {
                state.status = STATUSES.ERROR;
                state.error = payload;
            })
            .addCase(removeItemCart.pending, state => {
                state.status = STATUSES.LOADING;
            })
            .addCase(removeItemCart.fulfilled, (state, { payload: productId }) => {
                state.status = STATUSES.IDLE;
                state.carts = state.carts.filter(cartItem => cartItem.productId._id !== productId);
                // Recalculate the subTotal
                state.subTotal = state.carts.reduce((total, cartItem) => total + cartItem.productId.price * cartItem.quantity, 0);
            })
            .addCase(removeItemCart.rejected, (state, { payload }) => {
                state.status = STATUSES.ERROR;
                state.error = payload;
            });
    }
});

export default cartReducer.reducer;