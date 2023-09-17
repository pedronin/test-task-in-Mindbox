import { createSlice } from '@reduxjs/toolkit';
import { ITodoSlice } from './types';
import nextId from 'react-id-generator';

const initialState: ITodoSlice = {
  items: [],
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo(state, action) {
      if (!action.payload.trim()) return;
      state.items.push({ completed: false, text: action.payload, id: nextId() });
    },
    removeTodo(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearComplete(state) {
      state.items = state.items.filter((item) => item.completed !== true);
    },
    toggleComplete(state, action) {
      const find = state.items.find((item) => item.id === action.payload);
      if (find) {
        find.completed = !find?.completed;
      }
    },
  },
});

export const { addTodo, removeTodo, clearComplete, toggleComplete } = todoSlice.actions;
export default todoSlice.reducer;
