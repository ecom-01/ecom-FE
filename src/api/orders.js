import { saveOrder, getLastOrder } from "../store/orderStorage";

export const ordersApi = {
  async create(orderPayload) {
    // sau này: return apiClient.post("/orders", orderPayload)
    saveOrder(orderPayload);
    return orderPayload;
  },

  async getLast() {
    // sau này: return apiClient.get("/orders/last")
    return getLastOrder();
  },
};
