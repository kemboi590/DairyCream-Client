import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Tuser } from "../users/usersAPI";
import { ApiDomain } from "../../utils/ApiDomain";


export interface LoginResponse {
    token: string;
    user: Tuser;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export const loginAPI = createApi({
    reducerPath: 'loginAPI',
    baseQuery: fetchBaseQuery({ baseUrl: ApiDomain }),
    tagTypes: ['Login'],
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (user) => ({
                url: 'api/authentication/login-user',
                method: 'POST',
                body: user,
            }),
        }),
    }),
})