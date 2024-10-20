import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../redux/categoryesSlice'; 
import { fetchProducts } from '../redux/productsSlice'; 
import CategoryIcon from '@mui/icons-material/Category';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import { fetchUsers } from '../redux/usersSlice';
import GroupIcon from '@mui/icons-material/Group';
const Dashboard = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.items);
  const loading = useSelector((state) => state.categories.loading);
  const products = useSelector((state) => state.products.items)
  const users = useSelector((state) => state.users.items)
  
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts())
    dispatch(fetchUsers())
  }, [dispatch]);

  return (
    <div>
      <Typography variant="h4">
        Добро пожаловать на главную
      </Typography>

     
      <Card component={Link} to="/categoryes" sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: 140 }}>
            <CategoryIcon sx={{ fontSize: 60 }} />
          </Box>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Количество категорий: {loading ? 'Загрузка...' : categories.length}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Card component={Link} to="/products" sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: 140 }}>
            <ProductionQuantityLimitsIcon sx={{ fontSize: 60 }} />
          </Box>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Количество продуктов: {loading ? 'Загрузка...' : products.length}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Card component={Link} to="/users" sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: 140 }}>
            <GroupIcon sx={{ fontSize: 60 }} />
          </Box>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Количество пользователей: {loading ? 'Загрузка...' : users.length}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};

export default Dashboard;