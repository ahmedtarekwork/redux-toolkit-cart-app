import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// import setInLocalStorage from "../functions/setInLocalStorage";
import { productType } from "./productListSlice";

const initialState: {
  favoritesList: productType[];
} = {
  favoritesList: [],
};
// JSON.parse(localStorage.getItem("favorites") || "false") ||

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<productType>) => {
      state.favoritesList.push(action.payload);
      // setInLocalStorage("favorites", {
      //   type: "ADD_TO_LOCALSTORAGE",
      //   payload: action.payload,
      // });
    },
    removeFromFavorites: (state, action: PayloadAction<productType>) => {
      state.favoritesList = state.favoritesList.filter(
        (item) => item.id !== action.payload.id
      );
      // setInLocalStorage("favorites", {
      //   type: "REMOVE_FROM_LOCALSTORAGE",
      //   payload: action.payload,
      // });
    },
    editOnFavorites: (state, action: PayloadAction<productType>) => {
      state.favoritesList = state.favoritesList.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
      // setInLocalStorage("favorites", {
      //   type: "EDIT_IN_LOCALSTORAGE",
      //   payload: action.payload,
      // });
    },
    setFavorites: (state, action: PayloadAction<productType[]>) => {
      state.favoritesList = action.payload;
      // setInLocalStorage("favorites", {
      //   type: "SET_LOCALSTORAGE",
      //   payload: action.payload,
      // });
    },
    removeFavorites: (state) => {
      state.favoritesList = [];
      // setInLocalStorage("favorites", { type: "REMOVE_LOCALSTORAGE" });
    },
  },
});

export default favoritesSlice.reducer;
export const {
  addToFavorites,
  removeFromFavorites,
  editOnFavorites,
  setFavorites,
  removeFavorites,
} = favoritesSlice.actions;
