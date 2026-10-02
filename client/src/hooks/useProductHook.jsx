import { axiosInstance } from "../config/axiosInstance"

export const useProductHook = () =>{

    const getAllProducts = async () => {
        try {
            const res = await axiosInstance.get("/products/");
            console.log(res.data.data.products);
            return res?.data.data.products;
        } catch (error) {
            console.log("Error in get all products",error);
        }
    }

    const addProduct = async (product) => {
        try {
            const res = await axiosInstance.post("/products/",product);
            console.log(res);
        } catch (error) {
            console.log("Error in add products",error.response);
        }
    }
    
    
    const updateProduct = async (productId,productData) => {
        try {
            const res = await axiosInstance.put(`/products/${productId}`,productData);
            console.log(res);
        } catch (error) {
            console.log("Error in update product",error.response);
        }
    }

    const deleteProducts = async(productId) => {
        try {
            const res = await axiosInstance.delete(`/products/${productId}`);
            console.log(res)
        } catch (error) {
            console.log("Error in update product",error.response);
        }
    }

    return {
        getAllProducts,
        addProduct,
        updateProduct,
        deleteProducts
    }
}

