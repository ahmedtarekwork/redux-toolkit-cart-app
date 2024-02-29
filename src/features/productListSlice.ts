import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CartItemType, InitStateType } from "../types";

export type productType = Omit<CartItemType, "qty">;

type ExtraData = {
  productsList: productType[];
};

const initialState: InitStateType<ExtraData> = {
  loading: true,
  productsList: [],
  error: "",
};

export const getProducts = createAsyncThunk("cart/items", async () => {
  try {
    return (
      await (await fetch("https://fakestoreapi.com/products")).json()
    ).map((item: productType) => {
      item.id = item.id.toString();

      if (item.id === "3")
        item.description =
          "i hate this product description,so i remove it and replace it with this message, don't do that again with me";
      return item;
    });
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return error instanceof Error
      ? error.message
      : "something went wrong while fetching products";
  }
});

const productsListSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addToProducts: (state, action: PayloadAction<productType>) => {
      state.productsList.push(action.payload);

      // setInLocalStorage("products", {
      //   type: "ADD_TO_LOCALSTORAGE",
      //   payload: action.payload,
      // });
    },

    removeFromProducts: (state, action: PayloadAction<productType>) => {
      state.productsList.filter((prd) => prd.id !== action.payload.id);

      // setInLocalStorage("products", {
      //   type: "REMOVE_FROM_LOCALSTORAGE",
      //   payload: action.payload,
      // });
    },
    setProducts: (state, action: PayloadAction<productType[]>) => {
      state.productsList = action.payload;

      // setInLocalStorage("products", {
      //   type: "SET_LOCALSTORAGE",
      //   payload: action.payload,
      // });
    },
    resetProducts: (state) => {
      state.productsList = [];

      // setInLocalStorage("products", {
      //   type: "REMOVE_LOCALSTORAGE",
      // });
    },
    editOnProducts: (state, action: PayloadAction<productType>) => {
      state.productsList.map((prd) =>
        prd.id === action.payload.id ? action.payload : prd
      );

      // setInLocalStorage("products", {
      //   type: "EDIT_IN_LOCALSTORAGE",
      //   payload: action.payload,
      // });
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
        }
      )
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message!;
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
