import { useGetProductsQuery } from "../../api/products";

export const Products = () => {
  const { data: products, isFetching } = useGetProductsQuery();
  if (isFetching) return <div>Loading...</div>;
  return products.length ? (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  ) : (
    <div>No products found</div>
  );
};
