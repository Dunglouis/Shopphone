import Http from "./Http";

export const getProducts = (config) => Http.get("/products", config);
export const getCategory = (config) => Http.get("/categories", config);
export const getProductsByCategoryId = (id, config) =>
  Http.get(`categories/${id}/products`, config);
export const getProductCategory = (id, config) =>
  Http.get(`categories/${id}`, config);
export const getPorductsDetail = (id, config) =>
  Http.get(`/products/${id}`, config);
export const getCommentsproduct = (id, config) =>
  Http.get(`/products/${id}/comments`, config);
export const createCommentsproduct = (id, data) =>
  Http.post(`/products/${id}/comments`, data);
export const order = (data) => Http.post(`/order`, data);
export const getSlider = (config) => Http.get("/sliders", config);
export const getBanner = (config) => Http.get("/banners", config);
export const registerCustomer = (data) =>
  Http.post("/customers/register", data);
export const loginCustomer = (data) => Http.post("/customers/login", data);
export const getOrders = (id, config) =>
  Http.get(`/customers/${id}/orders`, config);
export const getOrderDetail = (id, config) =>
  Http.get(`/customer/orders/${id}`, config);
export const orderCanceled = (id) =>
  Http.get(`/customer/orders/${id}/canceled`);
export const updateCustomer = (id, data) =>
  Http.post(`/customers/${id}/update`, data);
export const refreshToken = () => Http.get("/customer/refreshtoken");
