import axios from "axios";
import toast from "react-hot-toast";

export const fetchProducts = async () => {
  try {
    const response = await axios.get("https://fakestoreapi.com/products");
    return response.data;
  } catch (error) {
    toast.error("Error fetching products:", error);
    throw error;
  }
};

export const fetchCategories = async () => {
  try {
    const response = await axios.get('https://fakestoreapi.com/products/categories');
    return response.data;
  } catch (error) {
    toast.error("Error fetching categories");
    throw error;
  }
};


export const fetchProductsByCategory = async (category) => {
  try {
    const response = await axios.get(`https://fakestoreapi.com/products/category/${category}`);
    return response.data;
  } catch (error) {
    toast.error("Error fetching products by category");
    throw error;
  }
};

