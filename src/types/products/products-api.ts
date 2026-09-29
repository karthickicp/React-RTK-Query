import type { IProduct } from "./products-reducer";

export type IAddProduct = Omit<IProduct, "id" | "created_at" | "updated_at">;

export type IUpdateProduct = IAddProduct & Pick<IProduct, "id">;
