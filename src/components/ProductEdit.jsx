import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchProducts } from "../redux/productsSlice";

export default function ProductEdit({
  open,
  handleClose,
  currentProduct,
  editedProduct,
  setEditedProduct,
}) {
  const dispatch = useDispatch();
  const { items: categories } = useSelector((state) => state.categories);

  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost:4000/api/products/${currentProduct._id}`,
        editedProduct
      );
      dispatch(fetchProducts());
      handleClose();
    } catch (error) {
      console.error("Ошибка при сохранении продукта:", error);
    }
  };

  const handleEditSizeChange = (event, newSizes) => {
    setEditedProduct((prevProduct) => ({ ...prevProduct, size: newSizes }));
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Редактировать продукт</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Название продукта"
          fullWidth
          value={editedProduct.name}
          onChange={(e) =>
            setEditedProduct({ ...editedProduct, name: e.target.value })
          }
        />
        <TextField
          margin="dense"
          label="Цена"
          type="number"
          fullWidth
          value={editedProduct.price}
          onChange={(e) =>
            setEditedProduct({ ...editedProduct, price: e.target.value })
          }
        />
        <FormControl fullWidth margin="dense">
          <InputLabel>Категория</InputLabel>
          <Select
            value={editedProduct.categoryId}
            onChange={(e) =>
              setEditedProduct({ ...editedProduct, categoryId: e.target.value })
            }
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
  );
}
