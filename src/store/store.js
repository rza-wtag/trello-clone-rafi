import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  lists: [
    { id: 1, title: "To do", cards: ["Project planning", "Kickoff meeting"] },
    { id: 2, title: "Doing", cards: [] },
    { id: 3, title: "Done", cards: [] },
  ],
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    addCard: (state, action) => {
      const { listId, cardText } = action.payload;
      const list = state.lists.find((list) => list.id === listId);
      if (list) {
        list.cards.push(cardText);
      }
    },
  },
});

export const { addCard } = boardSlice.actions;

const store = configureStore({
  reducer: {
    board: boardSlice.reducer,
  },
});

export default store;
