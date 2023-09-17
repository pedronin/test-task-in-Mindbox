import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ITodoSlice } from './types';

const initialState: ITodoSlice = {
  items: [],
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<string>) {
      if (!action.payload.trim()) return;
      state.items.push({ completed: false, text: action.payload, id: new Date().toISOString() });
    },
    removeTodo(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    toggleComplete(state, action: PayloadAction<string>) {
      const find = state.items.find((item) => item.id === action.payload);
      if (find) {
        find.completed = !find?.completed;
      }
    },
    clearComplete(state) {
      state.items = state.items.filter((item) => item.completed !== true);
    },
  },
});

export const { addTodo, removeTodo, clearComplete, toggleComplete } = todoSlice.actions;
export default todoSlice.reducer;
