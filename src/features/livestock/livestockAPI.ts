import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utils/ApiDomain";
import { RootState } from "../../app/store";

export type Livestock = {
    farmerId: number;
    livestockId: number;
    tagNumber: string;
    breed: string;
    dateOfBirth: Date;
    healthStatus: string;
    lastVaccineDate: Date;
};

export const livestockAPI = createApi({
    reducerPath: 'livestockAPI',
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
    tagTypes: ['Livestock'],
    endpoints: (builder) => ({
        getLivestock: builder.query<Livestock[], void>({
            query: () => 'api/livestock',
            providesTags: ['Livestock']
        }),
        createLivestock: builder.mutation<{ message: string }, Partial<Livestock>>({
            query: (newLivestock) => ({
                url: 'api/livestock',
                method: 'POST',
                body: newLivestock,
            }),
            invalidatesTags: ['Livestock']
        }),
        updateLivestock: builder.mutation<Livestock, Partial<Livestock & { livestockId: number }>>({
            query: ({ livestockId, farmerId, ...rest }) => ({
                url: `api/livestock/${livestockId}`,
                method: 'PUT',
                body: { livestockId, farmerId, ...rest }, 
            }),
            invalidatesTags: ['Livestock']
        }),
        deleteLivestock: builder.mutation<{ success: boolean, livestockId: number }, number>({
            query: (livestockId) => ({
                url: `api/livestock/${livestockId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Livestock']
        }),
        getLivestockById: builder.query<Livestock, number>({
            query: (livestockId) => `api/livestock/${livestockId}`
        }),
        getFarmerLivestock: builder.query<Livestock[], number>({
            query: (farmerId) => `api/livestock/farmer/${farmerId}`
        })

    })
});

