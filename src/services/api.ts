// src/services/api.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/" }), // Указываем URL вашего бэкенда
  tagTypes: ["Suppliers"],
  endpoints: (builder) => ({
    getSuppliers: builder.query({
      query: (params) => ({
        url: "/suppliers",
        params,
      }),
      providesTags: ["Suppliers"],
    }),
    addSupplier: builder.mutation({
      query: (newSupplier) => ({
        url: "suppliers",
        method: "POST",
        body: newSupplier,
      }),
      invalidatesTags: ["Suppliers"],
    }),
    deleteSupplier: builder.mutation({
      query: (id) => ({
        url: `suppliers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Suppliers"],
    }),
    updateSupplier: builder.mutation({
      query: (updatedSupplier) => ({
        url: `suppliers/${updatedSupplier.id}`,
        method: "PUT",
        body: updatedSupplier,
      }),
      invalidatesTags: ["Suppliers"],
    }),
  }),
});

export const {
  useGetSuppliersQuery,
  useAddSupplierMutation,
  useDeleteSupplierMutation,
  useUpdateSupplierMutation,
} = api;
