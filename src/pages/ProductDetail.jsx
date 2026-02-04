import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { productsApi } from "../api/products";
import { useCartStore } from "../store/cartStore";

export default function ProductDetail() {
  const { slug } = useParams();
  const addItem = useCartStore((s) => s.addItem);

  const [product, setProduct] = useState(null);

  useEffect(() => {
    productsApi.getBySlug(slug).then(setProduct);
  }, [slug]);

  if (product === null) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <>
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} />
      <p>{product.standard}</p>
      <p>
        <strong>{product.price.toLocaleString()} đ</strong>
      </p>
      <button onClick={() => addItem(product)}>Add to cart</button>
    </>
  );
}
