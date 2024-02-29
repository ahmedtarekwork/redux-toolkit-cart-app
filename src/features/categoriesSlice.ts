import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { productType } from "./productListSlice";

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async () => {
    try {
      return await (
        await fetch("https://fakestoreapi.com/products/categories")
      ).json();
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (error as any)?.message || "can't get categories";
    }
  }
);

export const getCategoryProducts = createAsyncThunk(
  "categories/getCategoryProducts",
  async (cat: string) => {
    try {
      return await (
        await fetch(`https://fakestoreapi.com/products/category/${cat}`)
      ).json();
    } catch (error) {
      return (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (error as any)?.message || `can't get products from ${cat} category`
      );
    }
  }
);

const initialState: {
  categories: string[];
  loading: boolean;
  error: string;

  categoryProducts: productType[];
  productsLoading: boolean;
  productsError: string;
} = {
  categories: [],
  loading: true,
  error: "",

  categoryProducts: [],
  productsLoading: true,
  productsError: "",
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message!;
      })
      // specific category products
      .addCase(getCategoryProducts.pending, (state) => {
        state.productsLoading = true;
      })
      .addCase(getCategoryProducts.fulfilled, (state, action) => {
        state.productsLoading = false;
        state.categoryProducts = action.payload;
      })
      .addCase(getCategoryProducts.rejected, (state, action) => {
        state.productsLoading = false;
        state.productsError = action.error.message!;
      });
  },
});

export default categoriesSlice.reducer;
