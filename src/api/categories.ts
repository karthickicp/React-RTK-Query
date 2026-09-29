import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabase } from "../lib/supabaseClient";
import type { PostgrestSingleResponse } from "@supabase/supabase-js";
import type { ICategories } from "../types/categories/categories-reducer";

export const categoriesApi = createApi({
  reducerPath: "categories",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["categories"],
  endpoints: (builder) => ({
    getCategories: builder.query<ICategories[], void>({
      queryFn: async () => {
        const { data, error }: PostgrestSingleResponse<ICategories[]> =
          await supabase.from("Categories").select("*");
        if (error) {
          return { error };
        }
        console.log(data, "data categories from api");
        return { data: data ?? [] };
      },
      providesTags: ["categories"],
    }),
    createCategory: builder.mutation({
      queryFn: async (category) => {
        const { data, error }: PostgrestSingleResponse<ICategories> =
          await supabase.from("Categories").insert(category);

        if (error) {
          return { error };
        }
        return { data };
      },
      invalidatesTags: ["categories"],
    }),
    updateCategory: builder.mutation({
      queryFn: async (category) => {
        const { data, error }: PostgrestSingleResponse<ICategories> =
          await supabase
            .from("Categories")
            .update(category)
            .eq("id", category.id);
        if (error) {
          return { error };
        }
        return { data };
      },
      invalidatesTags: ["categories"],
    }),
    deleteCategory: builder.mutation<ICategories, ICategories>({
      queryFn: async (category) => {
        const { data, error }: PostgrestSingleResponse<ICategories> =
          await supabase.from("Categories").delete().eq("id", category.id);
        if (error) {
          return { error };
        }
        return { data };
      },
      invalidatesTags: ["categories"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApi;
