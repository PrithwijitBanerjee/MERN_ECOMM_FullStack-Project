import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { STATUSES } from '../utils/statusObj';
import { axiosInstance } from '../apiUrl/axiosInstance'
const initialState = {
    status: STATUSES.IDLE,
    product: null,
    error: null
};

// thunk middleware ...
export const getProduct = createAsyncThunk('ecomm/product', async (slug, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.get(`products/list/${slug}`);
        return data;
    } catch (error) {
        return rejectWithValue(error?.response.data.message);
    }
});


// product reducers ...
const productDetailReducer = createSlice({
    name: 'product/ecomm/redux',
    initialState,
    extraReducers: builder => {
        builder.addCase(getProduct.pending, state => {
            state.status = STATUSES.LOADING;
        })
            .addCase(getProduct.fulfilled, (state, { payload }) => {
                if (payload?.success) {
                    state.status = STATUSES.IDLE;
                    state.product = payload?.payload;
                }
            })
            .addCase(getProduct.rejected, (state, { payload }) => {
                state.status = STATUSES.ERROR;
                state.error = payload;
            })
    }
});

export default productDetailReducer.reducer;