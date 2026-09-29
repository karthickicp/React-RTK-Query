import { useGetCategoriesQuery } from "../../api/categories";
import { Button } from "../../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

export const CategoriesPage = () => {
  const { data: categories } = useGetCategoriesQuery();
  return (
    <>
      <div className="m-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Categories</h1>
        <Button>Add Category</Button>
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
                  <Button>Edit</Button>
                  <Button variant="outline" className={"ml-4"}>
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
    </>
  );
};
