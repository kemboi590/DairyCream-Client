import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utils/ApiDomain";


export interface ForgotPasswordRequest {
    email: string;
    clientUri: string;
}

export interface ResetPasswordRequest {
    password: string;
    confirmPassword: string;
    email: string;
    token: string;
}

export const forgotPasswordAPI = createApi({
    reducerPath: "forgotPassword",
    baseQuery: fetchBaseQuery({ baseUrl: ApiDomain }),
    tagTypes: ["ForgotPassword"],
    endpoints: (builder) => ({
        forgotPassword: builder.mutation<{ message: string }, ForgotPasswordRequest>({
            query: (data) => ({
                url: "api/resetforgotpassword/forgot-password",
                method: "POST",
                body: data,
                responseHandler: (response) => response.text(),
            }),
        }),
    }),
})

export const resetPasswordAPI = createApi({
    reducerPath: "resetPassword",
    baseQuery: fetchBaseQuery({ baseUrl: ApiDomain }),
    tagTypes: ["ResetPassword"],
    endpoints: (builder) => ({
        resetPassword: builder.mutation<{ message: string }, ResetPasswordRequest>({
            query: (data) => ({
                url: "api/resetforgotpassword/reset-password",
                method: "POST",
                body: data,
                responseHandler: (response) => response.text(),
            }),
        }),
    }),
})