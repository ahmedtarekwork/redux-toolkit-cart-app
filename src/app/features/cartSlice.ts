import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { productType, CartItemType, InitStateType } from "../../types";
import axios from "axios";
import baseUrl from "../../baseUrl";

type ThunkParams = { userId: number; productsList: productType[] };
type CartType = Record<string, string | number> & {
  products: {
    productId: number;
    quantity: number;
  }[];
};

const errMsg = "something went wrong while geting cart items!";

export const getCartItems = createAsyncThunk(
  "cart/getCartItems",

  async ({ userId, productsList }: ThunkParams) => {
    try {
      const options = {
        // objects in array has more properties! but we want products property only
        transformResponse: (data: string) => {
          return JSON.parse(data)
            .map((cart: CartType) => cart.products)
            .flat();
        },
      };

      // extract products only
      const flatProducts = (
        await axios(`${baseUrl}/carts/user/${userId}`, options)
      ).data;

      // calc total qty for dublicated products
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
        ...productsList.find(
          (prd) => prd.id.toString() === flat.productId.toString()
        ),
        qty: flat.quantity,
      })) as CartItemType[];

      // returning the final products with total qty for each one
      return finalProducts;
    } catch (_) {
      throw errMsg;
    }
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

const setTheCart = (
  state: InitStateType<ExtraData>,
  { payload }: PayloadAction<CartItemType[]>
) => {
  state.cartItems = payload;
  state.cartItemsLength = payload.length;
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    setCart: setTheCart,

    resetCart: (state) => {
      state.cartItems = [];
      state.cartItemsLength = 0;
    },

    addToCart: (state, action: PayloadAction<CartItemType>) => {
      state.cartItems.push(action.payload);
      state.cartItemsLength++;
    },

    removeFromCart: (state, action: PayloadAction<CartItemType>) => {
      state.cartItems = [...state.cartItems].filter(
        (item) => item.id !== action.payload.id
      );
      state.cartItemsLength = state.cartItems.length;
    },

    editItemInCart: (state, action: PayloadAction<CartItemType>) => {
      state.cartItems = state.cartItems.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );

      state.cartItemsLength = state.cartItems
        .map((item) => item.qty)
        .reduce((a, b) => a + b);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCartItems.rejected, (state, { error: { message } }) => {
        state.loading = false;
        state.error = message || errMsg;
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
