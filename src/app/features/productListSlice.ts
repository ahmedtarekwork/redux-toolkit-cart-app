import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { productType, InitStateType } from "../../types";
import axios from "axios";
import baseUrl from "../../baseUrl";

type ExtraData = {
  productsList: productType[];
};

const initialState: InitStateType<ExtraData> = {
  loading: true,
  productsList: [],
  error: "",
};

const errMsg = "something went wrong while fetching products";

export const getProducts = createAsyncThunk("cart/items", async () => {
  try {
    const options = {
      transformResponse: (data: string) => {
        return JSON.parse(data).map((item: productType) => {
          if (item.id.toString() === "3")
            item.description =
              "i hate this product description,so i remove it and replace it with this message, don't do that again with me";

          return item;
        });
      },
    };

    const products = (await axios(`${baseUrl}/products`, options)).data;
    if (!products) throw errMsg;

    return products;
  } catch (_) {
    throw errMsg;
  }
});

const productsListSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addToProducts: (state, { payload }: PayloadAction<productType>) => {
      state.productsList.push(payload);
    },

    removeFromProducts: (state, { payload }: PayloadAction<productType>) => {
      state.productsList.filter((prd) => prd.id !== payload.id);
    },
    setProducts: (state, { payload }: PayloadAction<productType[]>) => {
      state.productsList = payload;
    },
    resetProducts: (state) => {
      state.productsList = [];
    },
    editOnProducts: (state, { payload }: PayloadAction<productType>) => {
      state.productsList.map((prd) => (prd.id === payload.id ? payload : prd));
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getProducts.fulfilled,
        (state, { payload }: PayloadAction<productType[]>) => {
          state.loading = false;
          state.productsList = payload;
          state.error = "";
        }
      )
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || errMsg;
        state.productsList = [];
      });
  },
});

export const {
  addToProducts,
  removeFromProducts,
  setProducts,
  resetProducts,
  editOnProducts,
} = productsListSlice.actions;
export default productsListSlice.reducer;
