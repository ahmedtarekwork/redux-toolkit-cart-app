import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { productType } from "../../types";
import axios from "axios";
import baseUrl from "../../baseUrl";

// error messages
const catErrMsg = "can't get categories!";
const catPrdErrMsg = (cat?: string) =>
  `can't get products from ${cat || "some"} category`;

export const getCategories = createAsyncThunk(
  "categories/getCategories",

  async () => {
    try {
      const cats = (await axios.get(`${baseUrl}/products/categories`)).data;
      if (!cats) throw Error();

      return cats;
    } catch (_) {
      throw catErrMsg;
    }
  }
);

export const getCategoryProducts = createAsyncThunk(
  "categories/getCategoryProducts",

  async (cat: string) => {
    try {
      const products = (await axios.get(`${baseUrl}/products/category/${cat}`))
        .data;
      if (!products) throw Error();

      return products;
    } catch (_) {
      throw catPrdErrMsg(cat);
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
        state.error = "";
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || catErrMsg;
        state.categories = [];
      })

      // specific category products
      .addCase(getCategoryProducts.pending, (state) => {
        state.productsLoading = true;
      })
      .addCase(getCategoryProducts.fulfilled, (state, action) => {
        state.productsLoading = false;
        state.categoryProducts = action.payload;
        state.productsError = "";
      })
      .addCase(getCategoryProducts.rejected, (state, { error }) => {
        state.productsLoading = false;
        state.productsError = error.message || catPrdErrMsg();
        state.categoryProducts = [];
      });
  },
});

export default categoriesSlice.reducer;
