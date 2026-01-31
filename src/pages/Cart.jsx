import { useCartStore } from "../store/cartStore";
import { Link } from "react-router-dom";
import { formatPrice } from "../utils/formatPrice";

export default function Cart() {
  const { items, updateQty, removeItem, clearCart } = useCartStore();

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  if (items.length === 0) return <p>Cart is empty</p>;

  return (
    <>
      <h1>Your Cart</h1>

      {items.map((item) => (
        <div
          key={item.id}
          style={{ borderBottom: "1px solid #ddd", padding: 8 }}
        >
          <strong>{item.name}</strong>
          <p>{item.price.toLocaleString()} đ</p>

          <button onClick={() => updateQty(item.id, item.qty - 1)}>-</button>
          <span style={{ margin: "0 8px" }}>{item.qty}</span>
          <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>

          <button
            style={{ marginLeft: 12 }}
            onClick={() => removeItem(item.id)}
          >
            Remove
          </button>
        </div>
      ))}

      <h2>Subtotal: {formatPrice(subtotal)}</h2>

      <div style={{ marginTop: 16, display: "flex", gap: 12 }}>
        <Link to="/checkout">Go to checkout</Link>
        <button onClick={clearCart}>Clear cart</button>
      </div>
    </>
  );
}
