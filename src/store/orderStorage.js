import { ORDER_STORAGE_KEY, LAST_ORDER_KEY } from "../utils/order";

export function saveOrder(order) {
  const current = JSON.parse(localStorage.getItem(ORDER_STORAGE_KEY) || "[]");
  const next = [order, ...current];
  localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(next));
  localStorage.setItem(LAST_ORDER_KEY, JSON.stringify(order));
}

export function getLastOrder() {
  try {
    return JSON.parse(localStorage.getItem(LAST_ORDER_KEY) || "null");
  } catch {
    return null;
  }
}
