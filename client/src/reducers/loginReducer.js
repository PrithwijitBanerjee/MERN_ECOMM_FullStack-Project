import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { STATUSES } from '../utils/statusObj';
import { toast } from 'react-toastify';
import { axiosInstance } from '../apiUrl/axiosInstance';

const initialState = {
    status: STATUSES.IDLE,
    error: null,
    logoutToggle: localStorage.getItem('logoutToggle') || false
};

// thunk middleware ...
export const signInUsr = createAsyncThunk('user/ecomm/login', async (userCreadentials, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.post('auth/login', userCreadentials);
        return data;
    } catch (error) {
        toast.error(error?.response?.data?.message, {
            theme: 'colored'
        });
        return rejectWithValue(error?.message);
    }
});

// user logout ...
export const logoutUsr = createAsyncThunk('user/ecomm/logout', async (_, { dispatch }) => {
    try {
        const res = await axiosInstance.post('auth/logout');
        if (res?.data?.success) {
            toast.success(res?.data?.message, { theme: 'colored' });
            dispatch(logoutSuccess()); // Dispatch an action to update the state
            localStorage.removeItem('logoutToggle');
        }
    } catch (error) {
        toast.error(error?.response?.data?.message, { theme: 'colored' });
    }
});

const loginReducer = createSlice({
    name: 'login/ecomm/user',
    initialState,
    reducers: {
        logoutStatus: state => {
            if (localStorage.getItem('logoutToggle')) {
                state.logoutToggle = true;
            }
        },
        logoutSuccess: state => {
            state.logoutToggle = false; // Reset logout toggle on successful logout
        }
    },
    extraReducers: builder => {
        builder
            .addCase(signInUsr.pending, state => {
                state.status = STATUSES.LOADING;
            })
            .addCase(signInUsr.fulfilled, (state, { payload }) => {
                if (payload?.success) {
                    state.status = STATUSES.IDLE;
                    state.logoutToggle = true;
                    localStorage.setItem('logoutToggle', state?.logoutToggle);
                    toast.success(payload?.message, { theme: 'colored' });
                }
            })
            .addCase(signInUsr.rejected, (state, { payload }) => {
                state.status = STATUSES.ERROR;
                state.error = payload;
            });
    }
});

export const { logoutStatus, logoutSuccess } = loginReducer.actions;
export default loginReducer.reducer;
