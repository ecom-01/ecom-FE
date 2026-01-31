import { create } from "zustand";

const STORAGE_KEY = "ecom-cart";

const loadCart = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
};

export const useCartStore = create((set, get) => ({
  items: loadCart(),

  addItem: (product) => {
    const items = get().items;
    const existing = items.find((i) => i.id === product.id);

    let newItems;
    if (existing) {
      newItems = items.map((i) =>
        i.id === product.id ? { ...i, qty: i.qty + 1 } : i
      );
    } else {
      newItems = [...items, { ...product, qty: 1 }];
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems));
    set({ items: newItems });
  },

  updateQty: (id, qty) => {
    const newItems = get().items.map((i) =>
      i.id === id ? { ...i, qty: Math.max(1, qty) } : i
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems));
    set({ items: newItems });
  },

  removeItem: (id) => {
    const newItems = get().items.filter((i) => i.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems));
    set({ items: newItems });
  },

  clearCart: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({ items: [] });
  },
}));
