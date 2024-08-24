import { toast } from "react-toastify"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../apiUrl/axiosInstance";
import { STATUSES } from "../utils/statusObj";

const initialState = {
    status: STATUSES.IDLE,
    orders: [],
    error: null
};

export const placedUsrOrder = async userInfo => {
    try {
        const { data } = await axiosInstance.post('orders/place', userInfo);
        if (data?.success) {
            return data?.message;
        }
    } catch (error) {
        throw error?.response?.data?.message;
    }
};

export const editOrderById = async (orderId, orderStatus) => {
    try {
        const { data } = await axiosInstance.put(`orders/edit/${orderId}`, orderStatus);

        if (data?.success) {
            toast.success(data?.message, {
                theme: 'colored'
            });
        }
    } catch (error) {
        toast.error(error?.response?.data?.message, {
            theme: 'colored'
        });
    }
}

// thunk middlewares ...

export const cancelUsrOrder = createAsyncThunk(
    'users/ecomm/order/cancel',
    async (orderId, { rejectWithValue }) => {
        try {
            const { data } = await axiosInstance.delete(`orders/cancel/${orderId}`);
            if (data?.success) {
                toast.success(data?.message, {
                    theme: 'colored'
                });
                return orderId;
            }
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || 'Something went wrong');
        }
    }
);

export const getAllOrders = createAsyncThunk(
    'users/ecomm/order',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axiosInstance.get('orders/list');
            if (data?.success) {
                return data;
            }
        } catch (error) {
            toast.error(error?.response?.data?.message, {
                theme: 'colored'
            });
            return rejectWithValue(error?.response?.data?.message || 'Failed to fetch orders');
        }
    }
);

// order reducer ...
const orderReducer = createSlice({
    name: 'order/ecomm/users',
    initialState,
    extraReducers: builder => {
        builder.addCase(getAllOrders.pending, state => {
            state.status = STATUSES.LOADING;
        })
            .addCase(getAllOrders.fulfilled, (state, { payload }) => {
                if (payload?.success) {
                    state.status = STATUSES.IDLE;
                    state.orders = payload?.payload;
                }
            })
            .addCase(getAllOrders.rejected, (state, { payload }) => {
                state.status = STATUSES.ERROR;
                state.error = payload;
            })
            .addCase(cancelUsrOrder.fulfilled, (state, { payload }) => {
                state.status = STATUSES.IDLE;
                state.orders = state.orders.filter(order => order?._id !== payload);
            })
            .addCase(cancelUsrOrder.rejected, (state, { payload }) => {
                state.status = STATUSES.ERROR;
                state.error = payload;
            })
    }
});

export default orderReducer.reducer;


