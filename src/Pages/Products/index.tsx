import { useState } from "react";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../api/products";
import { Button } from "../../components/ui/button";
import { AddProductModal } from "./modals/AddProductModal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

export const Products = () => {
  const { data: products, isFetching } = useGetProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  if (isFetching) return <div>Loading...</div>;

  const getCategoryName = (categoryId: number) => {
    const category = products?.find(
      (product) => product.category_id === categoryId,
    );
    return category ? category?.name : "Unknown";
  };

  return (
    <>
      <div className="m-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Products</h1>
        <Button onClick={() => setIsAddModalOpen(true)}>Add Product</Button>
      </div>
      {products.length ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-25">S.No</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product, index) => (
              <TableRow key={product.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.qty}</TableCell>
                <TableCell>{getCategoryName(product.category_id)}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      setSelectedProduct(product);
                      setIsAddModalOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    className={"ml-4"}
                    onClick={() => deleteProduct(product.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div>No products found</div>
      )}
      <AddProductModal
        isShowModal={isAddModalOpen}
        onModalClose={() => {
          setSelectedProduct(null);
          setIsAddModalOpen(false);
        }}
        product={selectedProduct}
      />
    </>
  );
};
