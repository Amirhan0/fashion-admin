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
  Divider,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, deleteOrder } from "../redux/ordersSlice";

const Orders = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.items);
  const loading = useSelector((state) => state.orders.loading);

  const [open, setOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleDelete = (orderId) => {
    dispatch(deleteOrder(orderId))
      .unwrap()
      .then(() => {
        console.log("Успешное удаление заказа");
        setOpen(false);
      })
      .catch((error) => {
        console.error("Ошибка при удалении заказа", error);
      });
  };

  const openDeleteDialog = (orderId) => {
    setSelectedOrderId(orderId);
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
    setSelectedOrderId(null);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Список заказов
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <List>
          {orders.map((order) => (
            <React.Fragment key={order._id}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={`Пользователь: ${order.recipient.lastName} ${order.recipient.firstName} ${order.recipient.middleName}`}
                  secondary={
                    <>
                      Телефон: {order.recipient.phoneNumber}
                      <br />
                      Адрес доставки: {order.deliveryAddress.city},{" "}
                      {order.deliveryAddress.street}, дом{" "}
                      {order.deliveryAddress.home}
                      {order.deliveryAddress.apartment &&
                        `, кв. ${order.deliveryAddress.apartment}`}
                      <br />
                      Способ оплаты: {order.paymentMethod}
                      <br />
                      <Typography variant="body2" fontWeight="bold">
                        Товары:
                      </Typography>
                      {order.products.map((product) => (
                        <div key={product.id}>
                          - {product.name} (Размер: {product.size}, Количество:{" "}
                          {product.quantiy}) — {product.price} ₽
                        </div>
                      ))}
                    </>
                  }
                />
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => openDeleteDialog(order._id)}
                  >
                    Удалить
                  </Button>
                </Stack>
              </ListItem>
              <Divider component="li" />
            </React.Fragment>
          ))}
        </List>
      )}

      <Dialog open={open} onClose={closeDialog}>
        <DialogTitle>Удаление заказа</DialogTitle>
        <DialogContent>
          <Typography>Вы уверены, что хотите удалить этот заказ?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            Отмена
          </Button>
          <Button
            onClick={() => handleDelete(selectedOrderId)}
            color="error"
            variant="contained"
          >
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Orders;
