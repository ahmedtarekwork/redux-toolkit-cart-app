import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { productType } from "../../types";

const initialState: {
  favoritesList: productType[];
} = {
  favoritesList: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<productType>) => {
      state.favoritesList.push(action.payload);
    },
    removeFromFavorites: (state, action: PayloadAction<productType>) => {
      state.favoritesList = state.favoritesList.filter(
        (item) => item.id !== action.payload.id
      );
    },
    editOnFavorites: (state, action: PayloadAction<productType>) => {
      state.favoritesList = state.favoritesList.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    setFavorites: (state, action: PayloadAction<productType[]>) => {
      state.favoritesList = action.payload;
    },
    removeFavorites: (state) => {
      state.favoritesList = [];
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
