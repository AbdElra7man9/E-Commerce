import { setupListeners } from "@reduxjs/toolkit/query"
import { configureStore } from '@reduxjs/toolkit'
import UserSlice from "./Slices/UserSlice";
import FeaturesSlice from './Slices/FeaturesSlice';
import DataSlice from './Slices/DataSlice';
import { apiSlice } from './ApiSlice';
import MessageSlice from "./Slices/MessageSlice";
export const Store = configureStore({
    reducer: {
        auth: UserSlice,
        Features: FeaturesSlice,
        Data: DataSlice,
        MSGs: MessageSlice,
        [apiSlice.reducerPath]: apiSlice.reducer,

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        apiSlice.middleware),
    devTools: process.env.NODE_ENV !== 'production',
});
setupListeners(Store.dispatch)

