import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CartItemType } from "../types";
import { InitStateType } from "../types";
import { productType } from "./productListSlice";

type ThunkParams = { userId: number; productsList: productType[] };
export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async ({ userId, productsList }: ThunkParams) => {
    const flatProducts = (
      (await (
        await fetch(`https://fakestoreapi.com/carts/user/${userId}`)
      ).json()) as {
        products: Record<"productId" | "quantity", number>;
      }[]
    ) // objects in array has more properties! but we want products property only
      .map((obj) => obj.products)
      .flat();

    const fullQty: Record<"productId" | "quantity", number>[] = [];

    for (let i = 0; i < flatProducts.length; i++) {
      const inArr = fullQty.findIndex(
        (prd) => prd.productId === flatProducts[i].productId
      );

      if (inArr !== -1) {
        fullQty[inArr] = {
          ...fullQty[inArr],
          quantity: fullQty[inArr].quantity + flatProducts[i].quantity,
        };
      } else fullQty.push(flatProducts[i]);
    }

    const finalProducts = fullQty.map((flat) => ({
      ...productsList.find((prd) => prd.id === flat.productId.toString()),
      qty: flat.quantity,
    })) as CartItemType[];

    return finalProducts;
  }
);

type ExtraData = {
  cartItems: CartItemType[];
  cartItemsLength: number;
};

const initialState: InitStateType<ExtraData> = {
  cartItems: [],
  cartItemsLength: 0,
  loading: true,
  error: "",
};

const setTheCart = (state, { payload }: PayloadAction<CartItemType[]>) => {
  state.cartItems = payload;
  state.cartItemsLength = payload.length;

  // setInLocalStorage("cart", {
  //   type: "SET_LOCALSTORAGE",
  //   payload: action.payload,
  // });
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    setCart: setTheCart,

    resetCart: (state) => {
      state.cartItems = [];
      state.cartItemsLength = 0;

      // setInLocalStorage("cart", { type: "REMOVE_LOCALSTORAGE" });
    },

    addToCart: (state, action: PayloadAction<CartItemType>) => {
      state.cartItems.push(action.payload);
      state.cartItemsLength++;

      // setInLocalStorage("cart", {
      //   type: "ADD_TO_LOCALSTORAGE",
      //   payload: action.payload,
      // });
    },

    removeFromCart: (state, action: PayloadAction<CartItemType>) => {
      state.cartItems = [...state.cartItems].filter(
        (item) => item.id !== action.payload.id
      );
      state.cartItemsLength = state.cartItems.length;

      // setInLocalStorage("cart", {
      //   type: "REMOVE_FROM_LOCALSTORAGE",
      //   payload: action.payload,
      // });
    },

    editItemInCart: (state, action: PayloadAction<CartItemType>) => {
      state.cartItems = state.cartItems.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );

      state.cartItemsLength = state.cartItems
        .map((item) => item.qty)
        .reduce((a, b) => a + b);

      // setInLocalStorage("cart", {
      //   type: "EDIT_IN_LOCALSTORAGE",
      //   payload: action.payload,
      // });
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCartItems.rejected, (state, { error: { message } }) => {
        state.loading = false;
        state.error = message!;
      })
      .addCase(
        getCartItems.fulfilled,
        (state, action: PayloadAction<CartItemType[]>) => {
          state.loading = false;
          setTheCart(state, action);
        }
      );
  },
});

export const { setCart, resetCart, addToCart, removeFromCart, editItemInCart } =
  cartSlice.actions;

export default cartSlice.reducer;
