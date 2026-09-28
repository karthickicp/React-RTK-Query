import { Card, CardContent, CardHeader } from "../../../components/ui/card";
import type { IProduct } from "../../../types/products/products-reducer";
export const ProductCard = ({ item }: { item: IProduct }) => {
  return (
    <Card>
      <CardHeader>
        <h1 className="text-xl text-bold">{item.name}</h1>
      </CardHeader>
      <CardContent>
        <p>price: {item.price}</p>
        <p>qty: {item.qty}</p>
      </CardContent>
    </Card>
  );
};
