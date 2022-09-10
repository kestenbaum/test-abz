import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const host:string = 'https://frontend-test-assignment-api.abz.agency/api/v1/token'

interface IState {
    tokenData: '',
    error: string | boolean,
    loading: boolean
}

const initialState:IState = {
    tokenData: '',
    error: false,
    loading: true
}


export const fetchTokenSlice  = createAsyncThunk(
    'token-slice/fetchTokenSlice',
    async () => {
        return  await axios.get(host).then(response => response.data.token)
    }
)

export const tokenSlice = createSlice({
    name: 'token-slice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchTokenSlice.pending, (state) => {
                state.loading = false
                state.error = ''
            })
            .addCase(fetchTokenSlice.fulfilled, (state, action) => {
                state.loading = true;
                state.tokenData = action.payload;
            })
    }
})

export const ActionTokenSlice = tokenSlice.reducer