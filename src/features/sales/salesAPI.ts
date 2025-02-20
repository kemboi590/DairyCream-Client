import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utils/ApiDomain";
import { RootState } from "../../app/store";

export type Sale = {
    saleId: number;
    farmerId: number;
    product: string;
    quantity: number;
    pricePerUnit: number;
    saleDate: string;
};

export type SaleResponse = {
    $id: string;
    $values: Sale[];
};

export const salesAPI = createApi({
    reducerPath: 'salesAPI',
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
    tagTypes: ['Sale'],
    endpoints: (builder) => ({
        getSales: builder.query<SaleResponse, void>({
            query: () => 'api/sales',
            providesTags: ['Sale']
        }),
        createSale: builder.mutation<{ message: string }, Partial<Sale>>({
            query: (newSale) => ({
                url: 'api/sale',
                method: 'POST',
                body: newSale
            }),
            invalidatesTags: ['Sale']
        }),
        updateSale: builder.mutation<Sale, Partial<Sale & { saleId: number }>>({
            query: ({ saleId, ...rest }) => ({
                url: `api/sale/${saleId}`,
                method: 'PUT',
                body: { saleId, ...rest }
            }),
            invalidatesTags: ['Sale']
        }),
        deleteSale: builder.mutation<{ success: boolean, saleId: number }, number>({
            query: (saleId) => ({
                url: `api/sale/${saleId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Sale']
        }),
        getSaleById: builder.query<Sale, number>({
            query: (saleId) => `api/sales/${saleId}`
        }),
        getFarmerSales: builder.query<SaleResponse, number>({
            query: (farmerId) => `api/sale/farmer/${farmerId}`
        })
    })
});
