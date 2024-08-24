import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../apiUrl/axiosInstance';
import { STATUSES } from '../utils/statusObj';

const initialState = {
    items: [],
    status: STATUSES.IDLE,
    error: null,
    pagination: {
        totalNoOfProducts: 0,
        page: 1,
        noOfPages: 0,
        prevPage: null,
        nextPage: null
    },
};

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (page = 1, thunkAPI) => {
        try {
            const response = await axiosInstance.get(`products/list?page=${page}&limit=2`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

const adminProductsReducer = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(fetchProducts.fulfilled, (state, { payload }) => {
                if (payload?.success) {
                    state.status = STATUSES.IDLE;
                    state.items = payload.payload.products;
                    state.pagination = payload.payload.pagination;
                }
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
                state.error = action.payload || action.error.message;
            });
    },
});

export default adminProductsReducer.reducer;
