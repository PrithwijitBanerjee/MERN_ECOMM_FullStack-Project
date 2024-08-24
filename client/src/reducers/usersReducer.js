import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { STATUSES } from '../utils/statusObj';
import { axiosInstance } from '../apiUrl/axiosInstance'
import { toast } from 'react-toastify';

const initialState = {
    status: STATUSES.IDLE,
    users: [],
    error: null,
    user: null
};

// thunk middleware ...
export const getAllUsers = createAsyncThunk('users/ecomm/fetch', async (_, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.get('users/all_users?limit=100');
        return data;
    } catch (error) {
        if (!error?.response.data.success) {
            return rejectWithValue(error?.response?.data?.message);
        }
    }
});
export const getSingleUser = createAsyncThunk('singleUser/ecomm/fetch', async (userId, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.get(`users/all_users/${userId}`);
        return data;
    } catch (error) {
        if (!error?.response.data.success) {
            return rejectWithValue(error?.response?.data?.message);
        }
    }
});

// update single user by :id ...
export const updateSingleUsrById = async (userId, userData) => {
    try {
        const { data } = await axiosInstance.put(`users/edit/${userId}`, userData);

        if (data?.success) {
            toast.success(data?.message, {
                theme: 'colored'
            });
        }
    } catch (error) {
        if (!error?.response.data.success) {
            toast.error(error?.response?.data?.message, {
                theme: 'colored'
            });
        }
    }
};

// delete user by :id ...
export const deleteUsrById = createAsyncThunk('user/ecomm/delete', async (userId, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.delete(`users/del/${userId}`);
        if (data?.success) {
            toast.error(data?.message, {
                theme: 'colored'
            });
        }
        return userId;
    } catch (error) {
        if (!error?.response.data.success) {
            toast.error(error?.response?.data?.message, {
                theme: 'colored'
            });
        }
        return rejectWithValue(error?.response?.data?.message);
    }
});

// users reducers ...
const usersReducer = createSlice({
    name: 'fetch/ecomm/users',
    initialState,
    extraReducers: builder => {
        builder.addCase(getAllUsers.pending, state => {
            state.status = STATUSES.LOADING;
        })
            .addCase(getAllUsers.fulfilled, (state, { payload }) => {
                if (payload?.success) {
                    state.users = payload?.payload?.users;
                    state.status = STATUSES.IDLE;
                }
            })
            .addCase(getAllUsers.rejected, (state, { payload }) => {
                state.status = STATUSES.ERROR;
                state.error = payload;
            })
            .addCase(getSingleUser.pending, state => {
                state.status = STATUSES.LOADING;
            })
            .addCase(getSingleUser.fulfilled, (state, { payload }) => {
                if (payload?.success) {
                    state.status = STATUSES.IDLE;
                    state.user = payload?.payload?.user;
                }
            })
            .addCase(getSingleUser.rejected, (state, { payload }) => {
                state.status = STATUSES.ERROR;
                state.error = payload;
            })
            .addCase(deleteUsrById.fulfilled, (state, { payload }) => {
                state.users = state.users.filter(user => user?._id !== payload);
            })
            .addCase(deleteUsrById.rejected, (state, { payload }) => {
                state.error = payload;
                state.status = STATUSES.ERROR;
            })
    }
});

export default usersReducer.reducer;