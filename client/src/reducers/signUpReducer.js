import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { STATUSES } from '../utils/statusObj';
import { axiosInstance } from '../apiUrl/axiosInstance';
import { toast } from 'react-toastify';

const initialState = {
    status: STATUSES.IDLE,
    error: null
};


// thunk middleware ...
export const signUpUser = createAsyncThunk('user/ecomm/signUp', async (userCredentials, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.post('users/register', userCredentials);
        return data;
    } catch (error) {
        return rejectWithValue(error?.message);
    }
});


// signUp reducer ...
const signUpReducer = createSlice({
    name: 'signUp/ecomm/user',
    initialState,
    extraReducers: builder => {
        builder.addCase(signUpUser.pending, state => {
            state.status = STATUSES.LOADING;
        })
            .addCase(signUpUser.fulfilled, (state, { payload }) => {
                if (payload?.success) {
                    state.status = STATUSES.IDLE;
                    toast.success(payload?.message, {
                        theme: 'colored'
                    });
                }
            })
            .addCase(signUpUser.rejected, (state, { payload }) => {
                state.status = STATUSES.ERROR;
                state.error = payload;
            })
    }
});

export default signUpReducer.reducer;