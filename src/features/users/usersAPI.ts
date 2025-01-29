import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utils/ApiDomain";
import { RootState } from "../../app/store";

export interface Tuser {
    id: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
    role: string;
}

export const usersAPI = createApi({
    reducerPath: 'usersAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: ApiDomain,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).user.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            headers.set('Content-Type', 'application/json');
            return headers;
        }
    }),
    tagTypes: ['Users'],
    endpoints: (builder) => ({
        getUsers: builder.query<Tuser[], void>({
            query: () => 'users',
            providesTags: ['Users']
        }),
        createUser: builder.mutation<{ message: string }, Partial<Tuser>>({
            query: (newUser) => ({
                url: 'api/authentication/register-user',
                method: 'POST',
                body: newUser,
                responseHandler: (response) => response.text()
            }),
            invalidatesTags: ['Users']
        }),
        updateUser: builder.mutation<Tuser, Partial<Tuser & { id: string }>>({
            query: ({ id, ...rest }) => ({
                url: `users/${id}`,
                method: 'PUT',
                body: rest
            }),
            invalidatesTags: ['Users']
        }),
        deleteUser: builder.mutation<{ success: boolean, id: string }, string>({
            query: (id) => ({
                url: `users/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Users']
        }),
        getUserById: builder.query<Tuser, string>({
            query: (id) => `users/${id}`
        }),
    }),
})