import { useState } from "react";
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "../../api/categories";
import { Button } from "../../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { AddOrEditCategoryModal } from "./Modals/AddOrEditCategoryModal";
import type { ICategories } from "../../types/categories/categories-reducer";

export const CategoriesPage = () => {
  const { data: categories } = useGetCategoriesQuery();

  const [deleteCategory] = useDeleteCategoryMutation();

  const [selectedCategory, setSelectedCategory] = useState<ICategories | null>(
    null,
  );
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);

  return (
    <>
      <div className="m-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Categories</h1>
        <Button onClick={() => setIsAddCategoryModalOpen(true)}>
          Add Category
        </Button>
      </div>
      {categories?.length ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-25">S.No</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category, index) => (
              <TableRow key={category.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      setSelectedCategory(category);
                      setIsAddCategoryModalOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    className={"ml-4"}
                    onClick={() => deleteCategory(category.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div>No Categories found</div>
      )}

      <AddOrEditCategoryModal
        isShowModal={isAddCategoryModalOpen}
        onModalClose={() => {
          setSelectedCategory(null);
          setIsAddCategoryModalOpen(false);
        }}
        category={selectedCategory}
      />
    </>
  );
};
