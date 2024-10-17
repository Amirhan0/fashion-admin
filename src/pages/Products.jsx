import React from 'react';
import { Typography, CircularProgress, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';
import { useEffect} from 'react';
import {fetchProducts} from '../redux/productsSlice'
import { useDispatch, useSelector } from 'react-redux';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
const Products = () => {
    const dispatch = useDispatch()
    const products = useSelector((state) => state.products.items)
    const loading = useSelector((state) => state.products.loading)
    useEffect(() => {
      dispatch(fetchProducts())
    }, [dispatch])

  return (
    <div>
    <Typography variant="h4" gutterBottom>
        Список продуктов:
    </Typography>
    {loading ? (
      <CircularProgress />
    ) : (
      <List>
        {products.map((product) => (
          <ListItem key={product.id}>
            <ListItemText primary={product.name} secondary={`Цена: ₽${product.price}`}  
            primaryTypographyProps={{ fontSize: '1.2rem', fontWeight: 'bold' }}
            secondaryTypographyProps={{ color: 'text.secondary' }}/>
               <Stack direction="row" spacing={2}>
                         <Button variant="contained" color="success">
                         Редактировать
                    </Button>
                     <Button variant="outlined" color="error">
                       Удалить
                    </Button>
                   </Stack>
          </ListItem>
        ))}
      </List>
    )}
  </div>
  );
};

export default Products;
