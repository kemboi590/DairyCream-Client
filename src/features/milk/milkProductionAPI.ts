import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utils/ApiDomain";
import { RootState } from "../../app/store";

export type MilkProduction = {
    livestockId: number;
    productionDate: Date;
    quantityLiters: number;
    farmerId: number;
};

export type MilkProductionResponse = {
    $id: string;
    $values: MilkProduction[];
};

export const milkProductionAPI = createApi({
    reducerPath: 'milkProductionAPI',
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
    tagTypes: ['MilkProduction'],
    endpoints: (builder) => ({
        getMilkProduction: builder.query<MilkProductionResponse, void>({
            query: () => 'api/milkproductions',
            providesTags: ['MilkProduction']
        }),
        createMilkProduction: builder.mutation<{ message: string }, Partial<MilkProduction>>({
            query: (newMilkProduction) => ({
                url: 'api/milkproductions',
                method: 'POST',
                body: newMilkProduction
            }),
            invalidatesTags: ['MilkProduction']
        }),
        updateMilkProduction: builder.mutation<MilkProduction, Partial<MilkProduction & { livestockId: number }>>({
            query: ({ livestockId, ...rest }) => ({
                url: `api/milkproductions/${livestockId}`,
                method: 'PUT',
                body: { livestockId, ...rest }
            }),
            invalidatesTags: ['MilkProduction']
        }),
        deleteMilkProduction: builder.mutation<{ success: boolean, livestockId: number }, number>({
            query: (livestockId) => ({
                url: `api/milkproductions/${livestockId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['MilkProduction']
        }),
        getMilkProductionById: builder.query<MilkProduction, number>({
            query: (livestockId) => `api/milkproductions/${livestockId}`
        }),
        getFarmerMilkProduction: builder.query<MilkProductionResponse, number>({
            query: (farmerId) => `api/milkproductions/farmer/${farmerId}`
        })
    })
});