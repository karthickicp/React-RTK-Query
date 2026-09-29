import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IProduct } from "../types/products/products-reducer";
// import type { IAddProduct } from "../types/products/products-api";
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
          await supabase
            .from("Products")
            .select()
            .order("id", { ascending: true });
        if (error) {
          return { error };
        }
        return { data: data ?? [] };
      },
      providesTags: ["products"],
    }),
    createProduct: builder.mutation({
      queryFn: async (product) => {
        const { data, error }: PostgrestSingleResponse<IProduct> =
          await supabase.from("Products").insert(product);

        if (error) {
          return { error };
        }
        return { data };
      },
      invalidatesTags: ["products"],
    }),
    updateProduct: builder.mutation({
      queryFn: async (product) => {
        const { data, error }: PostgrestSingleResponse<IProduct> =
          await supabase.from("Products").update(product).eq("id", product.id);
        if (error) {
          return { error };
        }
        return { data };
      },
      invalidatesTags: ["products"],
    }),
    deleteProduct: builder.mutation({
      queryFn: async (id: number) => {
        const { data, error }: PostgrestSingleResponse<number> = await supabase
          .from("Products")
          .delete()
          .eq("id", id);
        if (error) {
          return { error };
        }
        return { data };
      },
      invalidatesTags: ["products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
