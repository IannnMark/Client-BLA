import React, { useState } from "react";

import { Link } from "react-router-dom";

import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandLess from "@mui/icons-material/ExpandMore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-free/css/all.css";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
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

  const [isHovered, setIsHovered] = useState(false); // State to track hover state

  const handleProductsClick = () => {
    setOpenProducts(!openProducts);
  };

  return (


    <>
      <div className="sidebar-container">
        <div
          className="sidebar-icon-button"
          onClick={toggleDrawer(true)}
          style={{
            marginRight: "2px",
            cursor: isHovered ? "pointer" : "default",
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <FontAwesomeIcon
            icon={faBars}
            style={{ marginRight: "5px", marginTop: "5px", fontSize: "3.5rem" }}
          />
          <p
            style={{ margin: "2px", fontWeight: "bold", fontSize: "2rem" }}
          ></p>
        </div>
        <Drawer
          anchor="left"
          open={open}
          onClose={toggleDrawer(false)}
          sx={{
            "& .MuiPaper-root": {

              backgroundColor: "lightgray",
              width: "220px",
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
                "&:hover": {
                  backgroundColor: "#ebde70",
                  borderRadius: "10px",

                },
              }}
            >
              <ListItemIcon>
                <i class="fa-solid fa-chart-simple"></i>
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>

            <ListItemButton
              onClick={handleDocumentsClick}
              sx={{
                "&:hover": {
                  backgroundColor: "#ebde70",
                  borderRadius: "10px",
                },
              }}
            >
              <ListItemIcon>
                <i class="fa-solid fa-file"></i>
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
                    "&:hover": {
                      backgroundColor: "#ebde70",
                      borderRadius: "10px",
                    },
                    pl: 4,
                  }}
                >
                  <ListItemIcon>
                    <i class="fa-regular fa-rectangle-list"></i>
                  </ListItemIcon>

                  <ListItemText primary="Document List" />
                </ListItemButton>

                <ListItemButton
                  component={Link}
                  to="/admin/document"
                  sx={{
                    "&:hover": {
                      backgroundColor: "#ebde70",
                      borderRadius: "10px",
                    },
                    pl: 4,
                  }}
                >
                  <ListItemIcon>
                    <i class="fa-solid fa-folder-plus"></i>
                  </ListItemIcon>

                  <ListItemText primary="Add Document" />
                </ListItemButton>
              </List>
            </Collapse>

            <ListItemButton
              component={Link}
              to="/admin/requests"
              sx={{
                "&:hover": {
                  backgroundColor: "#ebde70",
                  borderRadius: "10px",
                },
              }}
            >
              <ListItemIcon>
                <i class="fa-solid fa-envelope-open-text"></i>
              </ListItemIcon>
              <ListItemText primary="Requests" />
            </ListItemButton>

            <ListItemButton
              onClick={handleProductsClick}
              sx={{
                "&:hover": {
                  backgroundColor: "#ebde70",
                  borderRadius: "10px",
                },
              }}
            >
              <ListItemIcon>
                <i class="fa-solid fa-cart-shopping"></i>
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
                    "&:hover": {
                      backgroundColor: "#ebde70",
                      borderRadius: "10px",
                    },
                    pl: 4,
                  }}
                >
                  <ListItemIcon>
                    <i class="fa-solid fa-list"></i>
                  </ListItemIcon>

                  <ListItemText primary="Product List" />
                </ListItemButton>

                <ListItemButton
                  component={Link}
                  to="/admin/product"
                  sx={{
                    "&:hover": {
                      backgroundColor: "#ebde70",
                      borderRadius: "10px",
                    },
                    pl: 4,
                  }}
                >
                  <ListItemIcon>
                    <i class="fa-solid fa-square-plus"></i>
                  </ListItemIcon>

                  <ListItemText primary="Add Product" />
                </ListItemButton>

                <ListItemButton
                  component={Link}
                  to="/admin/stock-history"
                  sx={{
                    "&:hover": {
                      backgroundColor: "#ebde70",
                      borderRadius: "10px",
                    },
                    pl: 4,
                  }}
                >
                  <ListItemIcon>
                    <i class="fa-solid fa-warehouse"></i>
                  </ListItemIcon>

                  <ListItemText primary="Stocks" />
                </ListItemButton>
              </List>
            </Collapse>

            <ListItemButton
              component={Link}
              to="/admin/orders"
              sx={{
                "&:hover": {
                  backgroundColor: "#ebde70",
                  borderRadius: "10px",
                },
              }}
            >
              <ListItemIcon>
                <i class="fa-solid fa-cart-arrow-down"></i>
              </ListItemIcon>
              <ListItemText primary="Orders" />
            </ListItemButton>

            <ListItemButton
              component={Link}
              to="/admin/users"
              sx={{
                "&:hover": {
                  backgroundColor: "#ebde70",
                  borderRadius: "10px",
                },
              }}
            >
              <ListItemIcon>
                <i class="fa-solid fa-users"></i>
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItemButton>

            <ListItemButton
              component={Link}
              to="/admin/reviews"
              sx={{
                "&:hover": {
                  backgroundColor: "#ebde70",
                  borderRadius: "10px",
                },
              }}
            >
              <ListItemIcon>
                <i class="fa-solid fa-comments"></i>
              </ListItemIcon>
              <ListItemText primary="Reviews" />
            </ListItemButton>

            <ListItemButton
              component={Link}
              to="/admin/stock-history"
              sx={{
                "&:hover": {
                  backgroundColor: "#ebde70",
                  borderRadius: "10px",
                },
              }}
            >
              <ListItemIcon>
                <i class="fa-solid fa-warehouse"></i>
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