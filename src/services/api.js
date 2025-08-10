export const api = {
  getProducts: () => fetch("/api/products").then(res => res.json()),
  createProduct: (data) =>
    fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }),
  updateProduct: (id, data) =>
    fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }),
  deleteProduct: (id) =>
    fetch(`/api/products/${id}`, { method: "DELETE" }),
};
