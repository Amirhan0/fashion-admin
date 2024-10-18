import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  const response = await axios.get('http://localhost:4000/api/categories');
  return response.data;
});

export const addCategory = createAsyncThunk('categories/addCategory', async (newCategory) => {
  const response = await axios.post('http://localhost:4000/api/categories', (newCategory))
  return response.data
})

export const deleteCategory = createAsyncThunk('categories/deleteCategory', async (categoryId) => {
  const response = await axios.delete(`http://localhost:4000/api/categories/${categoryId}`);
  return response.data;
});

export const updateCategory = createAsyncThunk('categories/updateCategory', async ({ categoryId, updatedData }) => {
  const response = await axios.put(`http://localhost:4000/api/categories/${categoryId}`, updatedData)
  return response.data
})

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((category) => category._id !== action.meta.arg);
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex((category) => category._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateCategory.rejected, (state,action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export default categoriesSlice.reducer;

