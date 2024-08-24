import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { STATUSES } from '../utils/statusObj';
import { axiosInstance } from '../apiUrl/axiosInstance';

const initialState = {
    status: STATUSES.IDLE,
    categories: [],
    error: null,
    category: null
};

// thunk middlewares ...
export const getAllCategories = createAsyncThunk('products/ecomm/categories', async (_, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.get('categories/list');
        return data;
    } catch (error) {
        return rejectWithValue(error?.response.data.message);
    }
});

// get single category by :slug
export const getSingleCategory = createAsyncThunk('products/ecomm/category',
    async (categorySlug, { rejectWithValue }) => {
        try {
            const { data } = await axiosInstance.get(`categories/list/${categorySlug}`);
            return data;
        } catch (error) {
            return rejectWithValue(error?.response.data.message);
        }
    }
);

// category reducers ...
const categoryReducer = createSlice({
    name: 'categories/ecomm/products',
    initialState,
    extraReducers: builder => {
        builder.addCase(getAllCategories.pending, state => {
            state.status = STATUSES.LOADING;
        })
            .addCase(getAllCategories.fulfilled, (state, { payload }) => {
                if (payload?.success) {
                    state.status = STATUSES.IDLE;
                    state.categories = payload?.payload?.categories;
                }
            })
            .addCase(getAllCategories.rejected, (state, { payload }) => {
                state.status = STATUSES.ERROR;
                state.error = payload;
            })
            .addCase(getSingleCategory.pending, state => {
                state.status = STATUSES.LOADING;
            })
            .addCase(getSingleCategory.fulfilled, (state, { payload }) => {
                if (payload?.success) {
                    state.status = STATUSES.IDLE;
                    state.category = payload?.payload;
                }
            })
            .addCase(getSingleCategory.rejected, (state, { payload }) => {
                state.status = STATUSES.ERROR;
                state.error = payload;
            })
    }
});

export default categoryReducer.reducer;