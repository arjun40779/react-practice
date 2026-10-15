import { createSlice } from "@reduxjs/toolkit";

type CounterState = {
  past: number[];
  present: number;
  future: number[];
};

const initialState: CounterState = {
  past: [],
  present: 0,
  future: [],
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment(state) {
      state.past.push(state.present);
      state.present += 1;
      state.future = [];
    },
    decrement(state) {
      state.past.push(state.present);
      state.present -= 1;
      state.future = [];
    },
    undo(state) {
      const previous = state.past.pop();
      if (previous === undefined) return;

      state.future.unshift(state.present);
      state.present = previous;
    },
    redo(state) {
      const next = state.future.shift();
      if (next === undefined) return;

      state.past.push(state.present);
      state.present = next;
    },
  },
});

export const { decrement, increment, redo, undo } = counterSlice.actions;
export default counterSlice.reducer;
