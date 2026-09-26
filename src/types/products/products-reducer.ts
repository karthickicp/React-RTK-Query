export interface IProductsInitialState {
  products: IProduct[];
  isProductFetching: boolean;
  error: string | null;
}

export interface IProduct {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
  price: number;
  qty: number;
  category_id: number;
}
