import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User, InitStateType } from "../../types";
import axios from "axios";
import baseUrl from "../../baseUrl";

const errMsg = "something went wrong while fetching users";

export const getUsers = createAsyncThunk("users/getUsers", async () => {
  try {
    const options = {
      transformResponse: (data: string) => {
        return JSON.parse(data).map((user: User & { __v: unknown }) => {
          delete user.__v;
          return user;
        });
      },
    };
    const users = (await axios(`${baseUrl}/users`, options)).data;
    if (!users) throw errMsg;

    return users;
  } catch (_) {
    throw errMsg;
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
        state.error = action.error.message || errMsg;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.error = "";
      });
  },
});

export const { setCurrentUser, logoutCurrentUser } = usersSlice.actions;

export default usersSlice.reducer;
