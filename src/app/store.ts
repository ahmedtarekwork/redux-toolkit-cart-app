import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cartSlice";
import productsReducer from "../features/productListSlice";
import favoritesReducer from "../features/favoritesSlice";
import categoriesReducer from "../features/categoriesSlice";
import userReducer from "../features/userSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    favorites: favoritesReducer,
    categoires: categoriesReducer,
    users: userReducer,
  },
});
export default store;

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
