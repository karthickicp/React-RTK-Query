import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "../api/products";
import { categoriesApi } from "../api/categories";
// import logger from "redux-logger";

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      ...[productsApi.middleware, categoriesApi.middleware],
    ),
});
