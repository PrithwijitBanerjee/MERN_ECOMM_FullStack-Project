import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { STATUSES } from '../utils/statusObj';
import { axiosInstance } from '../apiUrl/axiosInstance'
const initialState = {
    status: STATUSES.IDLE,
    sliders: [],
    error: null
};

// thunk middleware ...

export const getAllSliders = createAsyncThunk('ecomm/banners', async (_, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.get('sliders/list');
        return data;
    } catch (error) {
        return rejectWithValue(error?.response.data.message);
    }
});


// banner reducers ...
const bannerReducer = createSlice({
    name: 'banners/ecomm/redux',
    initialState,
    extraReducers: builder => {
        builder.addCase(getAllSliders.pending, state => {
            state.status = STATUSES.LOADING;
        })
            .addCase(getAllSliders.fulfilled, (state, { payload }) => {
                if (payload?.success) {
                    state.status = STATUSES.IDLE;
                    state.sliders = payload?.payload;
                }
            })
            .addCase(getAllSliders.rejected, (state, { payload }) => {
                state.status = STATUSES.ERROR;
                state.error = payload;
            })
    }
});

export default bannerReducer.reducer;