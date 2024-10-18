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
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../redux/categoryesSlice';

const Categoryes = () => {
  const dispatch = useDispatch();
  const categoryes = useSelector((state) => state.categories.items);
  const loading = useSelector((state) => state.categories.loading);

  const [open, setOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [editedName, setEditedName] = useState('');

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleOpen = (category) => {
    setCurrentCategory(category);
    setEditedName(category.nameCategory);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentCategory(null);
  };

  const handleSave = () => {
    console.log(`Сохранено: ${editedName}`);
    handleClose();
  };

  return (
    <div>
      <Typography variant='h4'>Список категорий:</Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <List>
          {categoryes.map((category) => (
            <ListItem key={category.id}>
              <ListItemText
                primary={category.nameCategory}
                secondary={`Айди категории: ${category.categoryId}`}
                primaryTypographyProps={{ fontSize: '1.2rem', fontWeight: 'bold' }}
                secondaryTypographyProps={{ color: 'text.secondary' }}
              />
              <Stack direction='row' spacing={2}>
                <Button
                  variant='contained'
                  color='success'
                  onClick={() => handleOpen(category)}
                >
                  Редактировать
                </Button>
                <Button variant='outlined' color='error'>
                  Удалить
                </Button>
              </Stack>
            </ListItem>
          ))}
        </List>
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Редактировать категорию</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            label='Название категории'
            fullWidth
            variant='outlined'
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='secondary'>
            Отмена
          </Button>
          <Button onClick={handleSave} variant='contained' color='primary'>
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Categoryes;
