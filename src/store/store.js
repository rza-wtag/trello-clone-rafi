import {
  createSlice,
  createAsyncThunk,
  configureStore,
} from "@reduxjs/toolkit";
import { supabase } from "../supabaseClient";

export const fetchBoardData = createAsyncThunk(
  "board/fetchBoardData",
  async () => {
    const { data, error } = await supabase.from("board").select("*");
    if (error) {
      throw new Error(error.message);
    }
    return data.map((list) => ({
      ...list,
    }));
  }
);

const boardSlice = createSlice({
  name: "board",
  initialState: {
    lists: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoardData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBoardData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.lists = action.payload;
      })
      .addCase(fetchBoardData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

const store = configureStore({
  reducer: {
    board: boardSlice.reducer,
  },
});

export default store;
