import { products } from "../data/products";

export const productsApi = {
  async list() {
    //return apiClient.get("/products")
    return products;
  },

  async getBySlug(slug) {
    //return apiClient.get(`/products/${slug}`)
    return products.find((p) => p.slug === slug) || null;
  },
};
