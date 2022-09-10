import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const host:string = `https://frontend-test-assignment-api.abz.agency/api/v1/positions`


export const fetchPositionDate = createAsyncThunk(
    'position-slice/fetchPositionDate',
    async () => {
            return  await axios.get(host).then(response => response.data.positions)
    }
)

interface IState {
    positionData: any[]
    error: string | boolean
    loading: boolean
}

const initialState:IState = {
    positionData: [],
    error: '',
    loading: false
}

export const userSlice = createSlice({
    name: 'position-slice',
    initialState,
    reducers:{},
    extraReducers: builder => {
        builder
            .addCase(fetchPositionDate.pending, (state) => {
                state.loading = false
                state.error = ''
            })
            .addCase(fetchPositionDate.fulfilled, (state, action) => {
                state.loading = true;
                state.positionData = action.payload;
            })
    }
})

export const ActionPositionSlice = userSlice.reducer