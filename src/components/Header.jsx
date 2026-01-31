import { Link, NavLink } from "react-router-dom";
import { useCartStore } from "../store/cartStore";

export default function Header() {
  const items = useCartStore((s) => s.items);
  const totalQty = items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <header style={{ padding: 12, borderBottom: "1px solid #ddd" }}>
      <Link to="/"> Ecom Electronics</Link>

      <nav style={{ float: "right" }}>
        <NavLink to="/products">Products</NavLink>{" "}
        <NavLink to="/cart">
          Cart ({totalQty})
        </NavLink>
      </nav>
    </header>
  );
}
