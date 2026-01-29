import { useMemo, useState } from "react";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all"); // all | ram | ssd

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return products.filter((p) => {
      const matchType = type === "all" ? true : p.type === type;
      const matchQuery = q === "" ? true : p.name.toLowerCase().includes(q);
      return matchType && matchQuery;
    });
  }, [query, type]);

  return (
    <>
      <h1>Products</h1>

      <div style={{ display: "flex", gap: 12, alignItems: "center", margin: "12px 0 16px" }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          style={{ padding: 8, flex: 1 }}
        />

        <select value={type} onChange={(e) => setType(e.target.value)} style={{ padding: 8 }}>
          <option value="all">All</option>
          <option value="ram">RAM</option>
          <option value="ssd">SSD</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: 16,
          }}
        >
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </>
  );
}
