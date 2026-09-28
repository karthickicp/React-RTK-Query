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
  }),
});

export const { useGetCategoriesQuery } = categoriesApi;
