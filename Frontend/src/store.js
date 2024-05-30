import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './features/apiSlice';
import betsReducer from './features/betSlice'

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        bets: betsReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
})

export default store