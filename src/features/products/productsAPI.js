import axios from "axios";
import instance from "../../utils/axios.confiq";

export const fetchProducts = async () => {
  const data = await instance.get("/products");
  console.log(data);

  return data.data.data;
};

export const postProduct = async (productData) => {
  await axios.post("/product", productData);
};
