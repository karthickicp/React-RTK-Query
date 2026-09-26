import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  IProduct,
  IProductsInitialState,
} from "../types/products/products-reducer";

const INITIAL_STATE: IProductsInitialState = {
  products: [],
  isProductFetching: false,
  error: null,
};
const productsSlice = createSlice({
  name: "products",
  initialState: INITIAL_STATE,
  reducers: {
    getProductsRequest: (state) => {
      ((state.isProductFetching = true),
        (state.error = null),
        (state.products = []));
    },
    getProductsResponse: (state, action: PayloadAction<IProduct[]>) => {
      ((state.isProductFetching = false),
        (state.error = null),
        (state.products = action.payload));
    },
    getProductsFailure: (state, action: PayloadAction<string>) => {
      ((state.isProductFetching = false),
        (state.error = action.payload),
        (state.products = []));
    },
  },
});

export const { getProductsRequest } = productsSlice.actions;

export default productsSlice.reducer;
