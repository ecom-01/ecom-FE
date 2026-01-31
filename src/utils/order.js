export function generateOrderId() {
  // ví dụ: OD-20260129-8F3K2
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const rand = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `OD-${y}${m}${day}-${rand}`;
}

export const ORDER_STORAGE_KEY = "ecom-orders";
export const LAST_ORDER_KEY = "ecom-last-order";
