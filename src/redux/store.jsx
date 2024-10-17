import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from '../redux/categoryesSlice';
import productsSlice from '../redux/productsSlice';
const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    products: productsSlice
  },
});

export default store;
