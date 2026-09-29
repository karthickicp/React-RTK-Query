import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useGetCategoriesQuery } from "../../../api/categories";
import { Button } from "../../../components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Field, FieldError, FieldGroup } from "../../../components/ui/field";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { addProductSchema } from "../../../helpers/validationSchema";
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "../../../api/products";
import type { IProduct } from "../../../types/products/products-reducer";
import type {
  IAddProduct,
  IUpdateProduct,
} from "../../../types/products/products-api";

export const AddProductModal = ({
  isShowModal,
  onModalClose,
  product,
}: {
  isShowModal: boolean;
  onModalClose: () => void;
  product?: IProduct | null;
}) => {
  const { data: categories } = useGetCategoriesQuery();
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  const { control, reset, handleSubmit } = useForm({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      name: "",
      price: 0,
      qty: 0,
      category_id: undefined,
    },
    values: product?.id
      ? {
          name: product.name,
          price: product.price,
          qty: product.qty,
          category_id: product.category_id,
        }
      : null,
  });
  const categoriesList = categories?.map((category) => {
    return {
      value: category.id,
      label: category.name,
    };
  });

  const handleModalClose = () => {
    reset();
    onModalClose();
  };

  const addProduct = (data: IAddProduct) => {
    try {
      const response = createProduct(data);
      console.log(response, "response from add product modal");
      handleModalClose();
    } catch (error) {
      console.log(error, "error from add product modal");
    }
  };

  const handleProductUpdate = (data: IUpdateProduct) => {
    try {
      const response = updateProduct(data);
      console.log(response, "response from update product modal");
      handleModalClose();
    } catch (error) {
      console.log(error, "error from update product modal");
    }
  };

  return (
    <Dialog open={isShowModal} onOpenChange={handleModalClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
        </DialogHeader>
        <form
          id="add-product-form"
          onSubmit={handleSubmit((data: IAddProduct) =>
            product?.id
              ? handleProductUpdate({ ...data, id: product.id })
              : addProduct(data),
          )}
          className="sm:max-w-sm"
        >
          <FieldGroup>
            <Controller
              control={control}
              name="name"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    {...field}
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Name"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              control={control}
              name="price"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Label htmlFor="price">Price</Label>
                  <Input
                    {...field}
                    id="price"
                    name="price"
                    type="number"
                    placeholder="price"
                    onChange={(e) => {
                      const val = e.target.value;
                      field.onChange(val === "" ? undefined : parseFloat(val));
                    }}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={control}
              name="qty"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    {...field}
                    id="quantity"
                    name="qty"
                    type="number"
                    placeholder="Quantity"
                    onChange={(e) => {
                      const val = e.target.value;
                      field.onChange(val === "" ? undefined : parseFloat(val));
                    }}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="category_id"
              control={control}
              render={({ field, fieldState }) => (
                <Field>
                  <Label htmlFor="category_id">Category</Label>
                  <Select
                    {...field}
                    items={categoriesList}
                    value={
                      categoriesList?.find((item) => item.value === field.value)
                        ?.label ?? ""
                    }
                    onValueChange={(value) => field.onChange(Number(value))}
                    data-invalid={fieldState.invalid}
                  >
                    <SelectTrigger className="w-45">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {categoriesList?.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
        <DialogFooter>
          <DialogClose
            render={
              <Button variant="outline" onClick={handleModalClose}>
                Cancel
              </Button>
            }
          />
          <Button type="submit" form="add-product-form">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
