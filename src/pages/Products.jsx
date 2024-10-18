import React, { useEffect, useState } from 'react';
import {
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
import { fetchCategories } from '../redux/categoryesSlice';

const Products = () => {
   const dispatch = useDispatch();
  const { items: products, loading, error } = useSelector((state) => state.products);
  const { items: categories } = useSelector((state) => state.categories);

  const [open, setOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [editedProduct, setEditedProduct] = useState({ name: '', price: '', categoryId: '', size: [] });
  const [newProduct, setNewProduct] = useState({
    name: '', price: '', description: '', image: '', categoryId: '', size: [],
  });
  const [selectedSize, setSelectedSize] = useState([]);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleOpen = (product) => {
    setCurrentProduct(product);
    setEditedProduct({
      name: product.name,
      price: product.price,
      categoryId: product.categoryId,
      size: product.size || [],
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentProduct(null);
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:4000/api/products/${currentProduct._id}`, editedProduct);
      dispatch(fetchProducts());
      handleClose();
    } catch (error) {
      console.error('Ошибка при сохранении продукта:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/products/${id}`);
      dispatch(fetchProducts());
    } catch (error) {
      console.error('Ошибка при удалении продукта:', error);
    }
  };

  const handleAddProduct = async () => {
    try {
      const productToAdd = { 
        ...newProduct, 
        size: selectedSize, 
      };
      // console.log('Отправляемые данные:', productToAdd);
  
      await axios.post('http://localhost:4000/api/products', productToAdd);
      setNewProduct({ name: '', price: '', description: '', image: '', categoryId: '', size: [] });
      setSelectedSize([]);
      dispatch(fetchProducts());
    } catch (error) {
      console.error('Ошибка при добавлении продукта:', error.response?.data || error.message);
    }
  };

  const handleSizeChange = (event, newSizes) => setSelectedSize(newSizes);
  const handleEditSizeChange = (event, newSizes) => {
    setEditedProduct((prevProduct) => ({ ...prevProduct, size: newSizes }));
  };

  const renderProductList = () =>
    products.map((product) => (
      <ListItem key={product._id}>
        <ListItemText
          primary={product.name}
          secondary={`Цена: ₽${product.price}`}
        />
        <Stack direction="row" spacing={2}>
          <Button variant="contained" onClick={() => handleOpen(product)}>Редактировать</Button>
          <Button variant="outlined" color="error" onClick={() => handleDelete(product._id)}>Удалить</Button>
        </Stack>
      </ListItem>
    ));


  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Список продуктов:
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">Ошибка: {error}</Typography>
      ) : (
        <List>{renderProductList()}</List>
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Редактировать продукт</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Название продукта"
            fullWidth
            value={editedProduct.name}
            onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Цена"
            type="number"
            fullWidth
            value={editedProduct.price}
            onChange={(e) => setEditedProduct({ ...editedProduct, price: e.target.value })}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Категория</InputLabel>
            <Select
              value={editedProduct.categoryId}
              onChange={(e) => setEditedProduct({ ...editedProduct, categoryId: e.target.value })}
            >
              {categories.map((category) => (
                <MenuItem key={category._id} value={category.categoryId}>
                  {category.nameCategory}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Typography variant="subtitle1" gutterBottom>
          Изменить размеры:
        </Typography>
        <ToggleButtonGroup
          value={editedProduct.size}
          onChange={handleEditSizeChange}
          aria-label="Размеры"
          exclusive={false}
        >
          <ToggleButton value="S">S</ToggleButton>
          <ToggleButton value="M">M</ToggleButton>
          <ToggleButton value="L">L</ToggleButton>
        </ToggleButtonGroup>





        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Отмена
          </Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>







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
          exclusive={false}
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
    </div>
  );
};

export default Products;
