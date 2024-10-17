import React from 'react';
import { Typography, CircularProgress, List, ListItem, ListItemText } from '@mui/material';
import { useEffect} from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {fetchCategories} from '../redux/categoryesSlice'
import { useDispatch, useSelector } from 'react-redux';
const Categoryes = () => {
    const dispatch = useDispatch();
    const categoryes = useSelector((state) => state.categories.items)
    const loading = useSelector((state) => state.categories.loading)
    useEffect(() => {
       dispatch(fetchCategories())
    }, [dispatch])
    return (
        <div>
            <Typography variant='h4'>
                Список категорий:
            </Typography>
            {loading ? (
                <CircularProgress/>
            ) : (
                <List>
                    {categoryes.map((category) => (
                        <ListItem key={category.id}>
                            <ListItemText primary={category.nameCategory} secondary={`Айди категории: ${category.categoryId}`} 
                             primaryTypographyProps={{ fontSize: '1.2rem', fontWeight: 'bold' }}
                             secondaryTypographyProps={{ color: 'text.secondary' }}
                            />
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
    )
} 

export default Categoryes