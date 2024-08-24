import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { STATUSES } from '../utils/statusObj';
import { axiosInstance } from '../apiUrl/axiosInstance'
import { toast } from 'react-toastify';
const initialState = {
    status: STATUSES.IDLE,
    products: [],
    error: null,
    currentPage: 1, // Add currentPage to state
    product: null
};

// thunk middleware ...
export const getAllProducts = createAsyncThunk('ecomm/products', async (_, { getState, rejectWithValue }) => {
    const currentPage = getState().products?.currentPage || 1; // Get current page from state, default to 1
    try {
        const { data } = await axiosInstance.get(`products/list?limit=3&page=${currentPage}`);
        return data;
    } catch (error) {
        return rejectWithValue(error?.response.data.message);
    }
});

export const searchProductsByKeywords = createAsyncThunk('ecomm/products/search', async (searchedKeywords, { getState, rejectWithValue }) => {
    const currentPage = getState().products?.currentPage || 1; // Get current page from state, default to 1
    try {
        const { data } = await axiosInstance.get(`products/search/${searchedKeywords}?page=${currentPage}`);

        return data;
    } catch (error) {
        return rejectWithValue(error?.response.data.message);
    }
})

// add new product by Admin: 
export const addNewProduct = async productData => {
    try {
        const { data } = await axiosInstance.post('products/add', productData);
        toast.success(data?.message, {
            theme: 'colored'
        });
    } catch (error) {
        if (!error?.response.data.success) {
            toast.error(error?.response.data.message);
        }
    }
};

// update product by :slug by admin
export const updateProduct = async (productSlug, productData) => {
    try {
        const { data } = await axiosInstance.put(`products/edit/${productSlug}`, productData);
        if (data?.success) {
            toast.success(data?.message, {
                theme: 'colored'
            });
        }
    } catch (error) {
        if (!error?.response.data.success) {
            toast.error(error?.response.data.message);
        }
    }
};

// thunk middleware ...
export const delProductBySlug = createAsyncThunk('product/ecomm/slug', async (productSlug, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.delete(`products/del/${productSlug}`);
        if (data?.success) {
            toast.success(data?.message, {
                theme: 'colored'
            });
        }
        return productSlug;
    } catch (error) {
        if (!error?.response.data.success) {
            toast.error(error?.response.data.message);
        }
        return rejectWithValue(error?.response.data.message);
    }
});

export const fetchProductBySlug = createAsyncThunk('fetch/ecomm/product', async (productSlug, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.get(`products/list/${productSlug}`);
        return data;
    } catch (error) {
        if (!error?.response.data.success) {
            toast.error(error?.response.data.message);
        }
        return rejectWithValue(error?.response.data.message);
    }
});

// product reducers ...
const productReducer = createSlice({
    name: 'products/ecomm/redux',
    initialState,
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        }
    },
    extraReducers: builder => {
        builder.addCase(getAllProducts.pending, state => {
            state.status = STATUSES.LOADING;
        })
            .addCase(getAllProducts.fulfilled, (state, { payload }) => {
                if (payload?.success) {
                    state.status = STATUSES.IDLE;
                    state.products = payload?.payload;
                    state.error = null; // Reset error on successful fetch
                }
            })
            .addCase(getAllProducts.rejected, (state, { payload }) => {
                state.status = STATUSES.ERROR;
                state.error = payload;
            })
            .addCase(searchProductsByKeywords.pending, state => {
                state.status = STATUSES.LOADING;
            })
            .addCase(searchProductsByKeywords.fulfilled, (state, { payload }) => {
                if (payload?.success) {
                    state.status = STATUSES.IDLE;
                    state.products = payload?.payload;
                    state.error = null; // Reset error on successful fetch
                }
            })
            .addCase(searchProductsByKeywords.rejected, (state, { payload }) => {
                state.status = STATUSES.ERROR;
                state.error = payload;
            })
            .addCase(delProductBySlug.fulfilled, (state, { payload }) => {
                state.status = STATUSES.IDLE;
                state.products = state.products.filter(product => product?.slug !== payload);
                state.error = null; // Reset error on successful fetch
            })
            .addCase(delProductBySlug.rejected, (state, { payload }) => {
                state.status = STATUSES.ERROR;
                state.error = payload;
            })
            .addCase(fetchProductBySlug.pending, state => {
                state.status = STATUSES.LOADING;
            })
            .addCase(fetchProductBySlug.fulfilled, (state, { payload }) => {
                if (payload?.success) {
                    state.status = STATUSES.IDLE;
                    state.product = payload?.payload;
                    state.error = null; // Reset error on successful fetch
                }
            })
            .addCase(fetchProductBySlug.rejected, (state, { payload }) => {
                state.status = STATUSES.ERROR;
                state.error = payload;
            })
    }
});

export const { setCurrentPage } = productReducer.actions;
export default productReducer.reducer;