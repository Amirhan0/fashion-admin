import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchProducts } from "../redux/productsSlice";
import { fetchCategories } from "../redux/categoryesSlice";
import ProductsAdd from "../components/ProductsAdd";
import ProductEdit from "../components/ProductEdit";

const Products = () => {
  const dispatch = useDispatch();
  const {
    items: products,
    loading,
    error,
  } = useSelector((state) => state.products);
  const { items: categories } = useSelector((state) => state.categories);

  const [open, setOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [editedProduct, setEditedProduct] = useState({
    name: "",
    price: "",
    categoryId: "",
    size: [],
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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/products/${id}`);
      dispatch(fetchProducts());
    } catch (error) {
      console.error("Ошибка при удалении продукта:", error);
    }
  };

  const handleSizeChange = (event, newSizes) => setSelectedSize(newSizes);

  const renderProductList = () =>
    products.map((product) => (
      <ListItem key={product._id}>
        <ListItemText
          primary={product.name}
          secondary={`Цена: ₽${product.price}`}
        />
        <Stack direction="row" spacing={2}>
          <Button variant="contained" onClick={() => handleOpen(product)}>
            Редактировать
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => handleDelete(product._id)}
          >
            Удалить
          </Button>
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

      <ProductEdit
        open={open}
        handleClose={handleClose}
        currentProduct={currentProduct}
        editedProduct={editedProduct}
        setEditedProduct={setEditedProduct}
      />
      <ProductsAdd categories={categories} />
    </div>
  );
};

export default Products;
