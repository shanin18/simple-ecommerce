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
