import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User, InitStateType } from "../types";

export const getUsers = createAsyncThunk("users/getUsers", async () => {
  try {
    return (await (await fetch("https://fakestoreapi.com/users")).json()).map(
      (user) => {
        delete user.__v;
        return user;
      }
    );
  } catch (error) {
    return error instanceof Error
      ? error.message
      : "something went wrong while fetching users";
  }
});

type otherData = {
  users: User[];
  currentUser: User | null;
};

const initialState: InitStateType<otherData> = {
  users: [],
  loading: true,
  error: "",
  currentUser: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setCurrentUser: (state, { payload }: PayloadAction<User>) => {
      state.currentUser = payload;
    },
    logoutCurrentUser: (state) => {
      state.currentUser = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "something went wrong";
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      });
  },
});

export const { setCurrentUser, logoutCurrentUser } = usersSlice.actions;

export default usersSlice.reducer;
