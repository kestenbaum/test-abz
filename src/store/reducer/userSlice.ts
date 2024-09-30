import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

interface IState {
    totalUsers: number;
    page: number;
    userData: any;
    error: string | boolean;
    loading: boolean;
    total_users: number;
    nextLink: string;
}

const initialState: IState = {
    totalUsers: 1,
    page: 1,
    userData: [],
    error: '',
    loading: false,
    total_users: 0,
    nextLink: '',
};

export const fetchUsersDate = createAsyncThunk(
    'user-slice/fetchUsers',
    async (page: number) => {
        return await axios
            .get(
                `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${page}&count=6`,
            )
            .then((response) => response.data);
    },
);

export const userSlice = createSlice({
    name: 'user-slice',
    initialState,
    reducers: {
        nextPage(state, action) {
            state.page = action.payload;
        },
        showMore(state, action) {
            state.userData = [...state.userData, action.payload];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsersDate.pending, (state) => {
                state.loading = false;
                state.error = 'Error 500';
            })
            .addCase(fetchUsersDate.fulfilled, (state, action) => {
                state.loading = true;
                state.userData = [...action.payload.users].sort(
                    (a: UserInterface, b: UserInterface) => b.registration_timestamp - a.registration_timestamp)
                ;
                state.totalUsers = action.payload.total_users;
                state.error = '';
            });
    },
});

export const ActionUserSlice = userSlice.reducer;
