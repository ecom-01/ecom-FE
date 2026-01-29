import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div style={{ border: "1px solid #ddd", padding: 12 }}>
      <img src={product.image} alt={product.name} width="100%" />
      <h3>{product.name}</h3>
      <p>{product.standard}</p>
      <p>
        <strong>{product.price.toLocaleString()} đ</strong>
      </p>
      <Link to={`/products/${product.slug}`}>View detail</Link>
    </div>
  );
}
