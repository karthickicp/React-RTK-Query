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
import { Field, FieldGroup } from "../../../components/ui/field";
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

export const AddProductModal = ({ isShowModal, onModalClose }: any) => {
  const { data: categories } = useGetCategoriesQuery();

  const categoriesList = categories?.map((category) => {
    return {
      value: category.id,
      label: category.name,
    };
  });
  return (
    <Dialog open={isShowModal} onOpenChange={onModalClose}>
      <form>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" type="text" placeholder="Name" />
            </Field>
            <Field>
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                type="number"
                min={1}
                placeholder="price"
              />
            </Field>

            <Field>
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                name="qty"
                type="number"
                min={1}
                placeholder="Quantity"
              />
            </Field>
            <Field>
              <Label htmlFor="category">Category</Label>
              <Select items={categoriesList}>
                <SelectTrigger className="w-45">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {categoriesList.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose
              render={
                <Button variant="outline" onClick={onModalClose}>
                  Cancel
                </Button>
              }
            />
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
