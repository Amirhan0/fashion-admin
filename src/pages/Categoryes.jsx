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
import { deleteCategory, fetchCategories, updateCategory } from '../redux/categoryesSlice';
import CategoryesAdd from '../components/CategoryesAdd';

const Categoryes = () => {
  const dispatch = useDispatch();
  const categoryes = useSelector((state) => state.categories.items);
  const loading = useSelector((state) => state.categories.loading);

  const [open, setOpen] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [currentCategory, setCurrentCategory] = useState(null); 

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
    const updatedData = {
      nameCategory: editedName,
      categoryId: currentCategory.categoryId,
    };
  
    dispatch(updateCategory({ categoryId: currentCategory._id, updatedData })) 
      .unwrap()
      .then((response) => {
        console.log('Успешное обновление', response);
        handleClose();
      })
      .catch((error) => {
        console.error('Ошибка при обновлении', error);
      });
  };

  const handleDelete = (categoryId) => {
    dispatch(deleteCategory(categoryId))
      .unwrap()
      .then((response) => {
        console.log('Успешное удаление', response);
      })
      .catch((error) => {
        console.error('Ошибка при удалении', error);
      });
  };

  return (
    <div>
      <Typography variant='h4'>Список категорий:</Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <List>
          {categoryes.map((category) => (
            <ListItem key={category.categoryId}> 
              <ListItemText
                primary={category.nameCategory}
                secondary={`Айди категории: ${category.categoryId}`}
                primaryTypographyProps={{ fontSize: '1.2rem', fontWeight: 'bold' }}
                secondaryTypographyProps={{ color: 'text.secondary' }}
              />
              <Stack direction='row' spacing={2}>
                <Button variant='contained' color='success' onClick={() => handleOpen(category)}>
                  Редактировать
                </Button>
                <Button variant='outlined' color='error' onClick={() => handleDelete(category.categoryId)}>
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
          <TextField
            margin='dense'
            label='Айди категории'
            fullWidth
            variant='outlined'
            value={currentCategory?.categoryId} 
            disabled 
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

      <CategoryesAdd />
    </div>
  );
};

export default Categoryes;
