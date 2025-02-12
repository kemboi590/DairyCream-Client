import storage from "redux-persist/lib/storage";
import { usersAPI } from "../features/users/usersAPI";
import userSlice from '../features/users/userSlice';
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { loginAPI } from "../features/login/loginAPI";
import { forgotPasswordAPI, resetPasswordAPI } from "../features/users/PasswordReset";
import { livestockAPI } from "../features/livestock/livestockAPI";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user']
}

const rootReducer = combineReducers({
    [usersAPI.reducerPath]: usersAPI.reducer,
    [loginAPI.reducerPath]: loginAPI.reducer,
    [forgotPasswordAPI.reducerPath]: forgotPasswordAPI.reducer,
    [resetPasswordAPI.reducerPath]: resetPasswordAPI.reducer,
    [livestockAPI.reducerPath]: livestockAPI.reducer,
    user: userSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }).concat(usersAPI.middleware).concat(loginAPI.middleware)
        .concat(forgotPasswordAPI.middleware).concat(resetPasswordAPI.middleware)
        .concat(livestockAPI.middleware)
})

export const persistedStore = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch