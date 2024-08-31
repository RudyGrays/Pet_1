import { createSlice } from "@reduxjs/toolkit";
import { CounterSchema } from "../types/counterSchema";
const initialState: CounterSchema = {
  value: 0,
};
export const CounterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      if (state.value != 0) state.value -= 1;
    },
  },
});

export const { actions: counterActions } = CounterSlice;
export const { reducer: counterReducer } = CounterSlice;
