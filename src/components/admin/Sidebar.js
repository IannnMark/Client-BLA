import React, { useState } from "react";

import { Link } from "react-router-dom";

import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Collapse from '@mui/material/Collapse';
import BusinessIcon from '@mui/icons-material/Business';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandMore';
import StorefrontIcon from '@mui/icons-material/Storefront';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import PeopleIcon from '@mui/icons-material/People';
import ReviewsIcon from '@mui/icons-material/Reviews';


const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setOpen(open);
  };

  const [openDocuments, setOpenDocuments] = useState(false);

  const handleDocumentsClick = () => {
    setOpenDocuments(!openDocuments);
  };

  const [openProducts, setOpenProducts] = useState(false);

  const handleProductsClick = () => {
    setOpenProducts(!openProducts);
  };

  return (

    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={toggleDrawer(true)}
        sx={{
          marginRight: 2,
          "& .MuiSvgIcon-root": {
            fontSize: '3rem',
            color: 'red',
            marginLeft: '20px',
          },
        }}
      >
        <MenuIcon />
        <p style={{ margin: "2px", fontWeight: "bold" }}>DASHBOARD</p>
      </IconButton>
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <List>

          <ListItemButton component={Link} to="/dashboard">
            <ListItemIcon>

              <BusinessIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>

          <ListItemButton onClick={handleDocumentsClick}>
            <ListItemIcon>
              <DocumentScannerIcon />
            </ListItemIcon>
            <ListItemText primary="Documents" />
            {openDocuments ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>


          <Collapse in={openDocuments} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton component={Link} to="/admin/documents" sx={{ pl: 4 }}>

                <ListItemIcon>
                  <DocumentScannerIcon />
                </ListItemIcon>

                <ListItemText primary="All" />
              </ListItemButton>

              <ListItemButton component={Link} to="/admin/document" sx={{ pl: 4 }}>

                <ListItemIcon>
                  <NoteAddIcon />
                </ListItemIcon>

                <ListItemText primary="Add Document" />
              </ListItemButton>

            </List>
          </Collapse>


          <ListItemButton component={Link} to="/admin/requests">
            <ListItemIcon>

              <VolunteerActivismIcon />
            </ListItemIcon>
            <ListItemText primary="Requests" />
          </ListItemButton>



          <ListItemButton onClick={handleProductsClick}>
            <ListItemIcon>
              <StorefrontIcon />
            </ListItemIcon>
            <ListItemText primary="Products" />
            {openProducts ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openProducts} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton component={Link} to="/admin/products" sx={{ pl: 4 }}>

                <ListItemIcon>
                  <LocalMallIcon />
                </ListItemIcon>

                <ListItemText primary="All" />
              </ListItemButton>

              <ListItemButton component={Link} to="/admin/product" sx={{ pl: 4 }}>

                <ListItemIcon>
                  <AddCircleOutlineIcon />
                </ListItemIcon>

                <ListItemText primary="Add Product" />
              </ListItemButton>

            </List>
          </Collapse>


          <ListItemButton component={Link} to="/admin/orders">
            <ListItemIcon>

              <ShoppingBasketIcon />
            </ListItemIcon>
            <ListItemText primary="Orders" />
          </ListItemButton>

          <ListItemButton component={Link} to="/admin/users">
            <ListItemIcon>

              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItemButton>


          <ListItemButton component={Link} to="/admin/reviews">
            <ListItemIcon>

              <ReviewsIcon />
            </ListItemIcon>
            <ListItemText primary="Reviews" />
          </ListItemButton>



          <ListItemButton component={Link} to="/admin/stock-history">
            <ListItemIcon>

              <ReviewsIcon />
            </ListItemIcon>
            <ListItemText primary="Stock History" />
          </ListItemButton>





        </List>
      </Drawer>
    </>




  );
};

export default Sidebar;



