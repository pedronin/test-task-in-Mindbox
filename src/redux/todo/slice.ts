import { createSlice } from '@reduxjs/toolkit';
import { ITodoSlice } from './type';

const initialState: ITodoSlice = {
  items: [],
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo(state, action) {
      if (!action.payload.trim()) return;
      state.items.push({ completed: false, text: action.payload });
    },
    removeTodo(state, action) {
      state.items = state.items.filter((item) => item.text !== action.payload);
    },
    todoClearCmpltd(state) {
      state.items = state.items.filter((item) => item.completed !== true);
    },
    completedTodo(state, action) {
      const find = state.items.find((item) => item.text === action.payload);
      if (find) {
        find.completed = !find?.completed;
      }
    },
  },
});

export const { addTodo, removeTodo, todoClearCmpltd, completedTodo } = todoSlice.actions;
export default todoSlice.reducer;
