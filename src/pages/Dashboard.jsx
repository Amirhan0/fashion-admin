import React, { useEffect } from 'react';
import { Card, CardContent, Typography, CardActionArea, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../redux/categoryesSlice'; 
import { fetchProducts } from '../redux/productsSlice'; 
import { fetchUsers } from '../redux/usersSlice';
import { fetchOrders } from '../redux/ordersSlice';
import CategoryIcon from '@mui/icons-material/Category';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.categories.items);
  const products = useSelector((state) => state.products.items);
  const users = useSelector((state) => state.users.items);
  const orders = useSelector((state) => state.orders.items);

  const loadingCategories = useSelector((state) => state.categories.loading);
  const loadingProducts = useSelector((state) => state.products.loading);
  const loadingUsers = useSelector((state) => state.users.loading);
  const loadingOrders = useSelector((state) => state.orders.loading);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
    dispatch(fetchUsers());
    dispatch(fetchOrders());
  }, [dispatch]);

  const renderCard = (link, icon, title, count, loading) => (
    <Card component={Link} to={link} sx={{ maxWidth: 345, marginBottom: 2 }}>
      <CardActionArea>
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: 140 }}>
          {icon}
        </Box>
        <CardContent>
          <Typography gutterBottom variant="h5">
            {title}: {loading ? 'Загрузка...' : count}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Добро пожаловать на главную
      </Typography>

      {renderCard(
        "/categoryes",
        <CategoryIcon sx={{ fontSize: 60 }} />,
        "Категорий",
        categories.length,
        loadingCategories
      )}

      {renderCard(
        "/products",
        <ProductionQuantityLimitsIcon sx={{ fontSize: 60 }} />,
        "Продуктов",
        products.length,
        loadingProducts
      )}

      {renderCard(
        "/users",
        <PersonIcon sx={{ fontSize: 60 }} />,
        "Пользователей",
        users.length,
        loadingUsers
      )}

      {renderCard(
        "/orders",
        <ShoppingCartIcon sx={{ fontSize: 60 }} />,
        "Заказов",
        orders.length,
        loadingOrders
      )}
    </div>
  );
};

export default Dashboard;
