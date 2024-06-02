import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './features/apiSlice';
import betsReducer from './features/betSlice'
import authReducer from './features/authSlice'


const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        bets: betsReducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
})

export default store