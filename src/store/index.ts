import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {ActionUserSlice} from "./reducer/userSlice";
import {ActionPositionSlice} from "./reducer/positionSlice";
import {ActionTokenSlice} from "./reducer/tokenSlice";


export const store = combineReducers({
    ActionUserSlice,
    ActionPositionSlice,
    ActionTokenSlice
})

export const setupStore = () => {
    return configureStore({
        reducer: store
    })
}

export type RootState = ReturnType<typeof store>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']