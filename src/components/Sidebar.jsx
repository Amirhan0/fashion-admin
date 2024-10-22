import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import CategoryIcon from '@mui/icons-material/Category';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{ width: 240, [`& .MuiDrawer-paper`]: { width: 240 } }}
    >
      <Toolbar />
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Главная" />
        </ListItem>

        <ListItem button component={Link} to="/products">
          <ListItemIcon>
            <InventoryIcon />
          </ListItemIcon>
          <ListItemText primary="Продукты" />
        </ListItem>

        <ListItem button component={Link} to="/categoryes">
          <ListItemIcon>
            <CategoryIcon />
          </ListItemIcon>
          <ListItemText primary="Категории" />
        </ListItem>

        <ListItem button component={Link} to="/users">
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Пользователи" />
        </ListItem>

        <ListItem button component={Link} to="/orders">
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="Заказы" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
