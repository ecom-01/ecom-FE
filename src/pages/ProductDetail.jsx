import { useParams } from "react-router-dom";
import { products } from "../data/products";

export default function ProductDetail() {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug);

  if (!product) return <p>Product not found</p>;

  return (
    <>
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} />
      <p>Type: {product.type}</p>
      <p>Standard: {product.standard}</p>
      <p>Capacity: {product.capacity}</p>
      <p>
        <strong>{product.price.toLocaleString()} đ</strong>
      </p>
    </>
  );
}
