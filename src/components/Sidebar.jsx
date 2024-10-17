import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import CategoryIcon from '@mui/icons-material/Category';
import { Link } from 'react-router-dom';
import { Toolbar} from '@mui/material';
const Sidebar = () => {
  return (
    <Drawer variant="permanent" sx={{ width: 240, [`& .MuiDrawer-paper`]: { width: 240 } }}>
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
      </List>
    </Drawer>
  );
};

export default Sidebar;
