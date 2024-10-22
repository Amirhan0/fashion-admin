import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from '../redux/categoryesSlice';
import productsSlice from '../redux/productsSlice';
import usersSlice from '../redux/usersSlice';
import ordersSlice from '../redux/ordersSlice';
const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    products: productsSlice,
    users: usersSlice,
    orders: ordersSlice
  },
});

export default store;
