import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Tuser } from "./usersAPI";

export interface UserState {
    token: string | null;
    user: Tuser | null;
}
const initialState: UserState = {
    token: null,
    user: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginSuccess(state, action: PayloadAction<UserState>) {
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
        logOut(state) {
            state.token = null;
            state.user = null;
        },
        setCurrentUser(state, action) {
            state.user = action.payload
        }
    }
})

export const { loginSuccess, logOut, setCurrentUser } = userSlice.actions;
export default userSlice.reducer;
