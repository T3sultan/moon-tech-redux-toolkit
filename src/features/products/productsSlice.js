import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProducts, postProduct } from "./productsAPI";

const initialState = {
  products: [],
  isLoading: false,
  isError: false,
  postSuccess: false,
  error: "",
};

export const getProducts = createAsyncThunk("products/getProduct", async () => {
  const products = fetchProducts();
  return products;
});
export const addProducts = createAsyncThunk(
  "product/addProduct",
  async (data) => {
    const products = postProduct(data);
    return products;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isLoading = false;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.products = [];
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      })
      .addCase(addProducts.pending, (state, action) => {
        state.isLoading = true;
        state.postSuccess = false;
        state.isError = false;
      })
      .addCase(addProducts.fulfilled, (state, action) => {
        state.postSuccess = true;
        state.isLoading = false;
      })
      .addCase(addProducts.rejected, (state, action) => {
        state.products = [];
        state.isLoading = false;
        state.isError = true;
        state.postSuccess = false;
        state.error = action.error.message;
      });
  },
});
export default productsSlice.reducer;
