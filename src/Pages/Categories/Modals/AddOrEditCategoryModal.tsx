import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Field, FieldError, FieldGroup } from "../../../components/ui/field";
import { Controller, useForm } from "react-hook-form";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "../../../api/categories";
import { zodResolver } from "@hookform/resolvers/zod";
import { addCategorySchema } from "../../../helpers/validationSchema";
import type { IAddOrEditCategoryModalProps } from "../../../types/categories/categories-ui";

export const AddOrEditCategoryModal = ({
  isShowModal,
  onModalClose,
  category,
}: IAddOrEditCategoryModalProps) => {
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();

  const { control, reset, handleSubmit } = useForm({
    resolver: zodResolver(addCategorySchema),
    defaultValues: {
      name: "",
    },
    values: category?.id ? { name: category.name } : undefined,
  });
  const handleModalClose = () => {
    reset();
    onModalClose();
  };

  const handleCreateProduct = (data) => {
    try {
      const response = createCategory(data);
      console.log(response, "response from add category modal");
      handleModalClose();
    } catch (error) {
      console.log(error, "error from add category modal");
    }
  };

  const handleUpdateProduct = (data) => {
    try {
      const response = updateCategory(data);
      console.log(response, "response from add category modal");
      handleModalClose();
    } catch (error) {
      console.log(error, "error from add category modal");
    }
  };
  return (
    <Dialog open={isShowModal} onOpenChange={handleModalClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {category ? "Edit Category" : "Add Category"}
          </DialogTitle>
        </DialogHeader>

        <form
          id="add-category-form"
          onSubmit={handleSubmit((data) => {
            if (category?.id) {
              handleUpdateProduct({ ...data, id: category.id });
            } else {
              handleCreateProduct(data);
            }
            console.log(data);
          })}
          className="sm:max-w-sm"
        >
          <FieldGroup>
            <Label htmlFor="name">Category Name</Label>
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Input
                    {...field}
                    id="name"
                    name="name"
                    placeholder="Category Name"
                  />
                  {fieldState.error && (
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
              <Button
                variant="outline"
                data-testid="add-category-cancel-button"
              >
                Cancel
              </Button>
            }
          />
          <Button type="submit" form="add-category-form">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
