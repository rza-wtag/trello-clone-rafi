import {
  createSlice,
  createAsyncThunk,
  configureStore,
} from "@reduxjs/toolkit";
import { supabase } from "../supabaseClient";

// Fetch board data
export const fetchBoardData = createAsyncThunk(
  "board/fetchBoardData",
  async () => {
    const { data, error } = await supabase.from("board").select("*");
    if (error) {
      throw new Error(error.message);
    }
    return data
      .sort((a, b) => a.id - b.id)
      .map((list) => ({
        ...list,
      }));
  }
);

// Add card to Supabase
export const addCardToSupabase = createAsyncThunk(
  "board/addCardToSupabase",
  async ({ listId, cardText }) => {
    const { data: currentList, error: fetchError } = await supabase
      .from("board")
      .select("cards")
      .eq("id", listId)
      .single();

    if (fetchError) {
      throw new Error(fetchError.message);
    }

    const newCard = { id: Date.now(), title: cardText };
    const updatedCards = [...currentList.cards, newCard];
    const { data, error } = await supabase
      .from("board")
      .update({ cards: updatedCards })
      .eq("id", listId);

    if (error) {
      throw new Error(error.message);
    }

    return { listId, newCard };
  }
);

// Add list to Supabase
export const addListToSupabase = createAsyncThunk(
  "board/addListToSupabase",
  async (listTitle) => {
    const newList = { title: listTitle, cards: [] };
    const { data, error } = await supabase.from("board").insert([newList]);

    if (error) {
      throw new Error(error.message);
    }

    return data[0];
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
      })
      .addCase(addCardToSupabase.fulfilled, (state, action) => {
        const { listId, newCard } = action.payload;
        const list = state.lists.find((list) => list.id === listId);
        if (list) {
          list.cards.push(newCard);
        }
      })
      .addCase(addListToSupabase.fulfilled, (state, action) => {
        state.lists.push(action.payload);
      });
  },
});

const store = configureStore({
  reducer: {
    board: boardSlice.reducer,
  },
});

export default store;
