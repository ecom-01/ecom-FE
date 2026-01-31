import { useParams } from "react-router-dom";
import { products } from "../data/products";
import { useCartStore } from "../store/cartStore";
import { formatPrice } from "../utils/formatPrice";

export default function ProductDetail() {
  const { slug } = useParams();
  const addItem = useCartStore((s) => s.addItem);
  const product = products.find((p) => p.slug === slug);

  if (!product) return <p>Product not found</p>;

  return (
    <>
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} />
      <p>{product.standard}</p>
      <p>
        <strong>{formatPrice(product.price)}</strong>
      </p>

      <button onClick={() => addItem(product)}>
        Add to cart
      </button>
    </>
  );
}
