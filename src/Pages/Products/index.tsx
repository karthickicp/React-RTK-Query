import { useGetProductsQuery } from "../../api/products";
import { Button } from "../../components/ui/button";
import { AddProductModal } from "./modals/AddProductModal";
import { ProductCard } from "./SubPages/ProductCard";

export const Products = () => {
  const { data: products, isFetching } = useGetProductsQuery();
  if (isFetching) return <div>Loading...</div>;
  return (
    <>
      <div className="m-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Products</h1>
        <Button>Add Product</Button>
      </div>
      {products.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 m-6">
          {products.map((product) => (
            <ProductCard key={product.id} item={product} />
          ))}
        </div>
      ) : (
        <div>No products found</div>
      )}
      <AddProductModal isShowModal={true} onModalClose={() => {}} />
    </>
  );
};
