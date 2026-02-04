import { useEffect, useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { formatPrice } from "../utils/formatPrice";
import { generateOrderId } from "../utils/order";
import { ordersApi } from "../api/orders";

export default function Checkout() {
  const navigate = useNavigate();
  const { items, clearCart } = useCartStore();
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  useEffect(() => {
    if (!isPlacingOrder && (!items || items.length === 0)) {
      navigate("/cart");
    }
  }, [items, isPlacingOrder, navigate]);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    note: "",
  });
  const [error, setError] = useState("");

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.qty, 0),
    [items],
  );

  const shippingFee = subtotal > 0 ? 30000 : 0;
  const total = subtotal + shippingFee;

  const onChange = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
  };

  const onSubmit = async (e) => {
  e.preventDefault();
  setError("");

  if (!form.name.trim()) return setError("Please enter your name.");
  if (!form.phone.trim()) return setError("Please enter your phone.");
  if (!form.address.trim()) return setError("Please enter your address.");

  setIsPlacingOrder(true);

  const order = {
    id: generateOrderId(),
    createdAt: new Date().toISOString(),
    customer: {
      name: form.name.trim(),
      phone: form.phone.trim(),
      address: form.address.trim(),
      note: form.note.trim(),
    },
    items: items.map((i) => ({
      id: i.id,
      slug: i.slug,
      name: i.name,
      price: i.price,
      qty: i.qty,
    })),
    subtotal,
    shippingFee,
    total,
    status: "created",
  };

  try {
    await ordersApi.create(order);
    clearCart();
    navigate("/order-success");
  } catch (err) {
    // nếu create fail thì cho user thử lại
    setIsPlacingOrder(false);
    setError("Place order failed. Please try again.");
  }
};

  return (
    <>
      <h1>Checkout</h1>
      <p>
        <Link to="/cart">← Back to cart</Link>
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <form
          onSubmit={onSubmit}
          style={{ border: "1px solid #ddd", padding: 12 }}
        >
          <h2>Customer info</h2>

          {error && <p style={{ color: "crimson" }}>{error}</p>}

          <div style={{ marginBottom: 8 }}>
            <label>Name</label>
            <input
              value={form.name}
              onChange={onChange("name")}
              style={{ width: "100%", padding: 8 }}
            />
          </div>

          <div style={{ marginBottom: 8 }}>
            <label>Phone</label>
            <input
              value={form.phone}
              onChange={onChange("phone")}
              style={{ width: "100%", padding: 8 }}
            />
          </div>

          <div style={{ marginBottom: 8 }}>
            <label>Address</label>
            <input
              value={form.address}
              onChange={onChange("address")}
              style={{ width: "100%", padding: 8 }}
            />
          </div>

          <div style={{ marginBottom: 8 }}>
            <label>Note (optional)</label>
            <textarea
              value={form.note}
              onChange={onChange("note")}
              style={{ width: "100%", padding: 8 }}
            />
          </div>

          <button type="submit">Place order</button>
        </form>

        <div style={{ border: "1px solid #ddd", padding: 12 }}>
          <h2>Order summary</h2>
          {items.map((i) => (
            <div
              key={i.id}
              style={{ borderBottom: "1px solid #eee", padding: "8px 0" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <strong>{i.name}</strong>
                <span>x{i.qty}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>{formatPrice(i.price)}</span>
                <span>{formatPrice(i.price * i.qty)}</span>
              </div>
            </div>
          ))}

          <p style={{ marginTop: 12 }}>
            Subtotal: <strong>{formatPrice(subtotal)}</strong>
          </p>
          <p>
            Shipping: <strong>{formatPrice(shippingFee)}</strong>
          </p>
          <p>
            Total: <strong>{formatPrice(total)}</strong>
          </p>
        </div>
      </div>
    </>
  );
}
