import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header style={{ padding: "12px 16px", borderBottom: "1px solid #ddd" }}>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <Link to="/" style={{ fontWeight: 700, textDecoration: "none" }}>
          Ecom Electronics
        </Link>

        <nav style={{ marginLeft: "auto", display: "flex", gap: 12 }}>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/cart">Cart</NavLink>
        </nav>
      </div>
    </header>
  );
}
