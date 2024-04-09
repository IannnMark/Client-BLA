import React, { useState } from "react";

import { Link } from "react-router-dom";

import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Collapse from "@mui/material/Collapse";
import BusinessIcon from "@mui/icons-material/Business";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandLess from "@mui/icons-material/ExpandMore";
import DensitySmallIcon from '@mui/icons-material/DensitySmall';
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import PeopleIcon from "@mui/icons-material/People";
import ReviewsIcon from "@mui/icons-material/Reviews";
import InventoryIcon from '@mui/icons-material/Inventory';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DraftsIcon from '@mui/icons-material/Drafts';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AssessmentIcon from '@mui/icons-material/Assessment';


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
    // <div className="sidebar-wrapper">
    //   <navv id="sidebar">

    //     <ul className="list-unstyled components">
    //       <li>
    //         <Link to="/dashboard">
    //           <i className="fa fa-tachometer"></i> Dashboard
    //         </Link>
    //       </li>
    //       <li>
    //         <a
    //           href="#productSubmenu"
    //           data-toggle="collapse"
    //           aria-expanded="false"
    //           className="custom-toggle"
    //         >
    //           <i className="fa fa-product-hunt"></i> Products
    //         </a>

    //         <ul className="collapse list-unstyled" id="productSubmenu">
    //           <li>
    //             <Link to="/admin/products">
    //               <i className="fa fa-clipboard"></i> List of Products
    //             </Link>
    //             <br />
    //             <Link to="/admin/product">
    //               <i className="fa fa-plus"></i> Create
    //             </Link>
    //           </li>
    //         </ul>
    //       </li>

    //       <li>
    //         <a
    //           href="#documentSubmenu"
    //           data-toggle="collapse"
    //           aria-expanded="false"
    //           className="custom-toggle"
    //         >
    //           <i className="fa fa-file"></i> Documents
    //         </a>

    //         <ul className="collapse list-unstyled" id="documentSubmenu">
    //           <li>
    //             <Link to="/admin/documents">
    //               <i className="fa fa-clipboard"></i> List of Documents
    //             </Link>
    //             <br />
    //             <Link to="/admin/document">
    //               <i className="fa fa-plus"></i> Create
    //             </Link>
    //           </li>
    //         </ul>
    //       </li>

    //       <li>
    //         <Link to="/admin/orders">
    //           <i className="fa fa-shopping-basket"></i> Orders
    //         </Link>
    //       </li>

    //       <li>
    //         <Link to="/admin/requests">
    //           <i className="fa fa-file"></i> Requests
    //         </Link>
    //       </li>

    //       <li>
    //         <Link to="/admin/users">
    //           <i className="fa fa-users"></i> Users
    //         </Link>
    //       </li>

    //       <li>
    //         <Link to="/admin/reviews">
    //           <i className="fa fa-star"></i> Reviews
    //         </Link>
    //       </li>
    //     </ul>

    //   </navv>
    // </div>

    <>
      <div className="sidebar-container">
        <IconButton
          className="sidebar-icon-button"
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={toggleDrawer(true)}
          sx={{
            marginRight: 2,
            "& .MuiSvgIcon-root": {
              fontSize: "4rem",
              // background: 'linear-gradient(90deg, rgba(156, 134, 92, 1) 21%, rgba(238, 213, 108, 1) 47%, rgba(236, 211, 108, 1) 48%, rgba(156, 134, 92, 1) 80%)',
              marginLeft: "5px",
              marginTop: "-5px",
              // borderRadius: '75px'
            },
          }}
        >
          <MenuIcon />
          <p
            style={{ margin: "2px", fontWeight: "bold", fontSize: "2rem" }}
          ></p>
        </IconButton>
        <Drawer
          anchor="left"
          open={open}
          onClose={toggleDrawer(false)}
          sx={{
            "& .MuiPaper-root": {
              // Customize styles for the drawer paper
              backgroundColor: "lightgray", // Example color, you can change it
              width: "220px", // Example width, you can change it
              marginTop: "130px",
              background: "#B1A078",
              "@media (max-width: 800px) and (min-width: 613px)": {
                marginTop: "180px",
              },
              "@media (max-width: 612px)": {
                marginTop: "180px",
              },
              "@media (max-width: 1000px) and (min-width: 801px)": {
                marginTop: "106px",
              },
            },
          }}
        >
          <List className="sidebar-list">

            <ListItemButton
              component={Link}
              to="/dashboard"
              sx={{
                '&:hover': {
                  backgroundColor: '#ebde70',
                  borderRadius: '10px',
                },
              }}
            >
              <ListItemIcon>
                <BusinessIcon
                />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>

            <ListItemButton onClick={handleDocumentsClick}
              sx={{
                '&:hover': {
                  backgroundColor: '#ebde70',
                  borderRadius: '10px',
                },
              }}>
              <ListItemIcon >
                <InsertDriveFileIcon />
              </ListItemIcon>
              <ListItemText primary="Documents" />
              {openDocuments ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={openDocuments} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  component={Link}
                  to="/admin/documents"
                  sx={{
                    '&:hover': {
                      backgroundColor: '#ebde70',
                      borderRadius: '10px',
                    },
                    pl: 4
                  }}

                >
                  <ListItemIcon>
                    <DensitySmallIcon />
                  </ListItemIcon>

                  <ListItemText primary="Document List" />
                </ListItemButton>

                <ListItemButton
                  component={Link}
                  to="/admin/document"
                  sx={{
                    '&:hover': {
                      backgroundColor: '#ebde70',
                      borderRadius: '10px',
                    },
                    pl: 4
                  }}
                >
                  <ListItemIcon>
                    <NoteAddIcon />
                  </ListItemIcon>

                  <ListItemText primary="Add Document" />
                </ListItemButton>
              </List>
            </Collapse>

            <ListItemButton
              component={Link}
              to="/admin/requests"
              sx={{
                '&:hover': {
                  backgroundColor: '#ebde70',
                  borderRadius: '10px',
                },
              }}
            >
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary="Requests" />
            </ListItemButton>

            <ListItemButton
              onClick={handleProductsClick}
              sx={{
                '&:hover': {
                  backgroundColor: '#ebde70',
                  borderRadius: '10px',
                },
              }}
            >
              <ListItemIcon>
                <LocalMallIcon />
              </ListItemIcon>
              <ListItemText primary="Products" />
              {openProducts ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openProducts} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  component={Link}
                  to="/admin/products"
                  sx={{
                    '&:hover': {
                      backgroundColor: '#ebde70',
                      borderRadius: '10px',
                    },
                    pl: 4
                  }}
                >
                  <ListItemIcon>
                    <DensitySmallIcon />
                  </ListItemIcon>

                  <ListItemText primary="Product List" />
                </ListItemButton>

                <ListItemButton
                  component={Link}
                  to="/admin/product"
                  sx={{
                    '&:hover': {
                      backgroundColor: '#ebde70',
                      borderRadius: '10px',
                    },
                    pl: 4
                  }}
                >
                  <ListItemIcon>
                    <AddBoxIcon />
                  </ListItemIcon>

                  <ListItemText primary="Add Product" />
                </ListItemButton>

                <ListItemButton
                  component={Link}
                  to="/admin/stock-history"
                  sx={{
                    '&:hover': {
                      backgroundColor: '#ebde70',
                      borderRadius: '10px',
                    },
                    pl: 4
                  }}
                >
                  <ListItemIcon>
                    <InventoryIcon />
                  </ListItemIcon>

                  <ListItemText primary="Stocks" />
                </ListItemButton>
              </List>
            </Collapse>

            <ListItemButton
              component={Link} to="/admin/orders"
              sx={{
                '&:hover': {
                  backgroundColor: '#ebde70',
                  borderRadius: '10px',
                },
              }}
            >
              <ListItemIcon>
                <ShoppingBasketIcon />
              </ListItemIcon>
              <ListItemText primary="Orders" />
            </ListItemButton>

            <ListItemButton component={Link} to="/admin/users"
              sx={{
                '&:hover': {
                  backgroundColor: '#ebde70',
                  borderRadius: '10px',
                },
              }}
            >
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItemButton>

            <ListItemButton component={Link} to="/admin/reviews"
              sx={{
                '&:hover': {
                  backgroundColor: '#ebde70',
                  borderRadius: '10px',
                },
              }}
            >
              <ListItemIcon>
                <ReviewsIcon />
              </ListItemIcon>
              <ListItemText primary="Reviews" />
            </ListItemButton>

            <ListItemButton component={Link} to="/admin/stock-history"
              sx={{
                '&:hover': {
                  backgroundColor: '#ebde70',
                  borderRadius: '10px',
                },
              }}
            >
              <ListItemIcon>

                <AssessmentIcon />
              </ListItemIcon>
              <ListItemText primary="Order Logs" />
            </ListItemButton>

          </List>
        </Drawer>
      </div>
    </>




  );
};

export default Sidebar;


