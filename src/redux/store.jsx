import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from '../redux/categoryesSlice';
import productsSlice from '../redux/productsSlice';
import usersSlice from '../redux/usersSlice';
const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    products: productsSlice,
    users: usersSlice
  },
});

export default store;
