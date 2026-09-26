import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IProduct } from "../types/products/products-reducer";
import { supabase } from "../lib/supabaseClient";
import type { PostgrestSingleResponse } from "@supabase/supabase-js";

export const productsApi = createApi({
  reducerPath: "products",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["products"],
  endpoints: (builder) => ({
    getProducts: builder.query<IProduct[], void>({
      queryFn: async () => {
        const { data, error }: PostgrestSingleResponse<IProduct[]> =
          await supabase.from("Products").select("*");
        if (error) {
          return { error };
        }
        return { data: data ?? [] };
      },
      providesTags: ["products"],
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
