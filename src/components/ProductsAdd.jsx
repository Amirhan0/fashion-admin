import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Stack,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { fetchProducts } from '../redux/productsSlice';

export default function ProductsAdd() {
  const dispatch = useDispatch();
  const { items: categories } = useSelector((state) => state.categories);

  const [newProduct, setNewProduct] = useState({
    name: '', price: '', description: '', image: '', categoryId: '', size: [],
  });

  const [selectedSize, setSelectedSize] = useState([]); // Инициализация состояния

  const handleSizeChange = (event, newSizes) => setSelectedSize(newSizes);

  const handleAddProduct = async () => {
    try {
      const productToAdd = { 
        ...newProduct, 
        size: selectedSize, 
      };

      await axios.post('http://localhost:4000/api/products', productToAdd);
      setNewProduct({ name: '', price: '', description: '', image: '', categoryId: '', size: [] });
      setSelectedSize([]); // Сброс размера после добавления продукта
      dispatch(fetchProducts());
    } catch (error) {
      console.error('Ошибка при добавлении продукта:', error.response?.data || error.message);
    }
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <Typography variant="h5">Добавить новый продукт</Typography>
      <TextField
        label="Название"
        value={newProduct.name}
        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Ссылка на изображение"
        value={newProduct.image}
        onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Цена"
        type="number"
        value={newProduct.price}
        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Описание"
        value={newProduct.description}
        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Категория</InputLabel>
        <Select
          value={newProduct.categoryId}
          onChange={(e) => setNewProduct({ ...newProduct, categoryId: e.target.value })}
        >
          {categories.map((category) => (
            <MenuItem key={category._id} value={category.categoryId}>
              {category.nameCategory}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Typography variant="subtitle1" gutterBottom>
        Выберите размер:
      </Typography>
      <ToggleButtonGroup
        value={selectedSize}
        onChange={handleSizeChange}
        aria-label="Размеры"
      >
        <ToggleButton value="S">S</ToggleButton>
        <ToggleButton value="M">M</ToggleButton>
        <ToggleButton value="L">L</ToggleButton>
      </ToggleButtonGroup>

      <Button
        variant="contained"
        color="primary"
        onClick={handleAddProduct}
        style={{ marginTop: '20px' }}
      >
        Добавить продукт
      </Button>
    </div>
  );
}
