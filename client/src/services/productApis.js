import { axiosInstance } from "../config/axiosInstance";

export const getAllProducts = async () => {
  const res = await axiosInstance.get("/products/");

  return res.data.data.products;
};

export const getProductById = async (productId) => {
  const res = await axiosInstance.get(`/products/${productId}`);

  return res.data.data.product;
}

export const addProduct = async (product) => {
  try {
    const res = await axiosInstance.post("/products/", product);
  
    return res.data;
    
  } catch (error) {
    console.log(error.response);
  }
};

export const updateProduct = async ({ productId, productData }) => {
  const res = await axiosInstance.put(
    `/products/${productId}`,
    productData
  );

  return res.data;
};

export const deleteProduct = async (productId) => {
  const res = await axiosInstance.delete(
    `/products/${productId}`
  );

  return res.data;
};