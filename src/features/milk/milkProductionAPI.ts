import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utils/ApiDomain";
import { RootState } from "../../app/store";

export type MilkProduction = {
    milkProductionId: number;
    livestockId: number;
    productionDate: string;
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
        updateMilkProduction: builder.mutation<MilkProduction, Partial<MilkProduction & { milkProductionId: number }>>({
            query: ({ livestockId, milkProductionId, ...rest }) => ({
                url: `api/milkproductions/${milkProductionId}`,
                method: 'PUT',
                body: { livestockId, milkProductionId, ...rest }
            }),
            invalidatesTags: ['MilkProduction']
        }),
        deleteMilkProduction: builder.mutation<{ success: boolean, milkProductionId: number }, number>({
            query: (milkProductionId) => ({
                url: `api/milkproductions/${milkProductionId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['MilkProduction']
        }),
        getMilkProductionById: builder.query<MilkProduction, number>({
            query: (milkProductionId) => `api/milkproductions/${milkProductionId}`
        }),
        getFarmerMilkProduction: builder.query<MilkProductionResponse, number>({
            query: (farmerId) => `api/milkproductions/farmer/${farmerId}`
        })
    })
});