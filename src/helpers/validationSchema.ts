import * as zod from "zod";

export const addProductSchema = zod.object({
  name: zod.string().trim().nonempty("Name is required"),
  price: zod
    .number()
    .gte(1, "Quantity must be greater than 0")
    .nonnegative("Price must be greater than 0")
    .nonoptional("Price is required"),
  qty: zod
    .number()
    .gte(1, "Quantity must be greater than 0")
    .nonnegative("Quantity must be greater than 0")
    .nonoptional("Quantity is required"),
  category_id: zod
    .number("Category is required")
    .nonoptional("Category is required"),
});
