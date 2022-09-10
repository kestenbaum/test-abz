import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IPerson} from "../../types";
import axios from "axios";


const host:string = `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=6`

export const fetchUsersDate = createAsyncThunk<IPerson[], any, {fulfilledMeta: any}>(
    'users/fetchUsers',
    async () => {
           return  await axios.get(host).then(response => response.data.users)
    }
)

interface IState {
    userData: IPerson[]
    error: string | boolean
    loading: boolean
}

const initialState:IState = {
    userData: [],
    error: '',
    loading: false
}

export const userSlice = createSlice({
    name: 'user-slice',
    initialState,
    reducers:{
        showMore(state){
            state.userData = [...state.userData, ...state.userData]
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchUsersDate.pending, (state) => {
                state.loading = false
                state.error = ''
            })
            .addCase(fetchUsersDate.fulfilled, (state, action) => {
                state.loading = true;
                state.userData = action.payload;
            })
    }
})

export const ActionUserSlice = userSlice.reducer