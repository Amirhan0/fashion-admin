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
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUser } from "../redux/usersSlice"; 
const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.items);
  const loading = useSelector((state) => state.users.loading);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = (userId) => {
    dispatch(deleteUser(userId))
      .unwrap()
      .then((response) => {
        console.log("Успешное удаление", response);
        
      })
      .catch((error) => {
        console.error("Ошибка при удалении", error);
      });
};

  return (
    <div>
      <Typography variant="h4">Список пользователей:</Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <List>
          {users.map((user) => (
            <ListItem key={user._id}>
              <ListItemText
                primary={user.nameUser} 
                secondary={`Айди пользователя: ${user._id}`} 
                primaryTypographyProps={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                }}
                secondaryTypographyProps={{ color: "text.secondary" }}
              />
              <Stack direction="row" spacing={2}>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDelete(user._id)}
                >
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

export default Users;
