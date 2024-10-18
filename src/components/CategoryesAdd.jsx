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
import { addCategory } from '../redux/categoryesSlice';
export default function CategoryesAdd() {
    const [nameCategory, setNameCategory] = useState('')
    const [categoryId, setCategoryId] = useState(0)
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()

        const newCategory = {
            nameCategory: nameCategory,
            categoryId: categoryId
        }
        dispatch(addCategory(newCategory))
        .unwrap()
        .then((response) => {
            console.log('Категория добавлена', response)
            setNameCategory('')
            setCategoryId('')
        })
        .catch((error) => {
            console.log('Ошибка при добавлении категории', error)

        })
    }
    
    return (
         <div style={{ marginTop: '20px' }}>
      <Typography variant="h5">Добавить новую категорию</Typography>
     <form onSubmit={handleSubmit}>
        <TextField
        label="Название категории"
        fullWidth
        value={nameCategory}
        onChange={(e) => setNameCategory(e.target.value)}
        margin="normal"
      />
     <TextField
        label="Айди категории"
        fullWidth
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        type='submit'
        style={{ marginTop: '20px' }}
      >
        Добавить категорию
      </Button>

     </form>
     
    </div>
  );
}
