import { Link } from "react-router-dom";
import { getLastOrder } from "../store/orderStorage";
import { formatPrice } from "../utils/formatPrice";

export default function OrderSuccess() {
  const order = getLastOrder();

  if (!order) {
    return (
      <>
        <h1>Order success</h1>
        <p>No recent order found.</p>
        <Link to="/products">Go shopping</Link>
      </>
    );
  }

  return (
    <>
      <h1>🎉 Order placed successfully</h1>
      <p><strong>Order ID:</strong> {order.id}</p>

      <div style={{ border: "1px solid #ddd", padding: 12 }}>
        <h2>Items</h2>
        {order.items.map((i) => (
          <div key={i.id} style={{ borderBottom: "1px solid #eee", padding: "8px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>{i.name} x{i.qty}</span>
              <strong>{formatPrice(i.price * i.qty)}</strong>
            </div>
          </div>
        ))}
        <p style={{ marginTop: 12 }}>Total: <strong>{formatPrice(order.total)}</strong></p>
      </div>

      <p style={{ marginTop: 12 }}>
        <Link to="/products">Continue shopping</Link>
      </p>
    </>
  );
}
