// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { ApiDomain } from "../../utils/ApiDomain";
// import { RootState } from "../../app/store";

// // items
// export type Inventory = {
//     inventoryId: number;
//     farmerId: number;
//     itemName: string;
//     quantityAvailable: number;
//     unit: string;
//     lastRestocked: string;
// };

// export type InventoryResponse = {
//     $id: string;
//     $values: Inventory[];
// };

// export const inventoryAPI = createApi({
//     reducerPath: 'inventoryAPI',
//     baseQuery: fetchBaseQuery({
//         baseUrl: ApiDomain,
//         prepareHeaders: (headers, { getState }) => {
//             const token = (getState() as RootState).user.token;
//             if (token) {
//                 headers.set('Authorization', `Bearer ${token}`);
//             }
//             headers.set('Content-Type', 'application/json');
//             return headers;
//         }
//     }),
//     tagTypes: ['Inventory'],
//     endpoints: (builder) => ({
//         getInventories: builder.query<InventoryResponse, void>({
//             query: () => 'api/inventories',
//             providesTags: ['Inventory']
//         }),
//         createInventory: builder.mutation<{ message: string }, Partial<Inventory>>({
//             query: (newInventory) => ({
//                 url: 'api/inventory',
//                 method: 'POST',
//                 body: newInventory
//             }),
//             invalidatesTags: ['Inventory']
//         }),
//         updateInventory: builder.mutation<Inventory, Partial<Inventory & { inventoryId: number }>>({
//             query: ({ inventoryId, ...rest }) => ({
//                 url: `api/inventory/${inventoryId}`,
//                 method: 'PUT',
//                 body: { inventoryId, ...rest }
//             }),
//             invalidatesTags: ['Inventory']
//         }),
//         deleteInventory: builder.mutation<{ success: boolean, inventoryId: number }, number>({
//             query: (inventoryId) => ({
//                 url: `/api/inventory/${inventoryId}`,
//                 method: 'DELETE'
//             }),
//             invalidatesTags: ['Inventory']
//         }),
//         getInventoryById: builder.query<Inventory, number>({
//             query: (inventoryId) => `api/inventories/${inventoryId}`
//         }),
//         getFarmerInventories: builder.query<InventoryResponse, number>({
//             query: (farmerId) => `api/inventory/farmer/${farmerId}`
//         })
//     })
// });

