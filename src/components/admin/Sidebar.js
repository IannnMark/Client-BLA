import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-free/css/all.css";
import "./Sidebar.css";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = (event) => {
    event.preventDefault();
    const dropdown = document.getElementById("documentDropdown");
    dropdown.style.display =
      dropdown.style.display === "none" ? "block" : "none";
  };

  const toggleDropdownn = (event) => {
    event.preventDefault();
    const dropdown = document.getElementById("productDropdown");
    dropdown.style.display =
      dropdown.style.display === "none" ? "block" : "none";
  };


  const toggleDropdownnn = (event) => {
    event.preventDefault();
    const dropdown = document.getElementById("userDropdown");
    dropdown.style.display =
      dropdown.style.display === "none" ? "block" : "none";
  };


  return (
    <>
      <div className={`sidebar-container ${open ? "sidebar-open" : ""}`}>
        {!open && (
          <div
            className="sidebar-icon-button"
            onClick={toggleDrawer}
            style={{
              marginRight: "2px",
              cursor: "pointer",
            }}
          >
            <FontAwesomeIcon
              icon={faBars}
              style={{
                marginRight: "5px",
                marginTop: "5px",
                fontSize: "3.5rem",
              }}
            />
            <p
              style={{ margin: "2px", fontWeight: "bold", fontSize: "2rem" }}
            ></p>
          </div>
        )}
        {open && (
          <>
            <div className="sidebar-backdrop" onClick={toggleDrawer}></div>
            <div
              className="custom-drawer"
              style={{
                backgroundColor: "#B1A078",
                marginTop: "-1px",
                zIndex: "1000",
              }}
              ref={sidebarRef}
            >
              <div className="drawer-content">
                <ul className="list-unstyled components">
                  <li>
                    <a href="/dashboard">
                      <i class="fa-solid fa-chart-simple"></i> Dashboard
                    </a>
                  </li>

                  <li>
                    <a href="#" onClick={toggleDropdown}>
                      <i
                        className="fa fa-file"
                        style={{ marginBottom: "-0px" }}
                      ></i>{" "}
                      Documents
                    </a>

                    <ul
                      id="documentDropdown"
                      style={{ display: "none", marginTop: "15px" }}
                    >
                      <a href="/admin/documents" className="document-link">
                        <i class="fa fa-regular fa-rectangle-list"></i> Document
                        List
                      </a>
                      <br></br>
                      <br></br>
                      <a href="/admin/document">
                        <i class="fa-solid fa-folder-plus"></i> Add Document
                      </a>
                    </ul>
                  </li>

                  <li>
                    <a href="#" onClick={toggleDropdownn}>
                      <i
                        className="fa-solid fa-book"
                        style={{ marginBottom: "-0px" }}
                      ></i>{" "}
                      Products
                    </a>

                    <ul
                      id="productDropdown"
                      style={{ display: "none", marginTop: "15px" }}
                    >
                      <a href="/admin/products">
                        <i class="fa-solid fa-list"></i> Product List
                      </a>
                      <br></br>
                      <br></br>
                      <a href="/admin/product">
                        <i class="fa-solid fa-square-plus"></i> Add Product
                      </a>
                    </ul>
                  </li>

                  <li>
                    <a href="/admin/orders">
                      <i class="fa-solid fa-cart-shopping"></i> Orders
                    </a>
                  </li>

                  <li>
                    <a href="/admin/requests">
                      <i class="fa-solid fa-envelope-open-text"></i> Requests
                    </a>
                  </li>




                  <li>
                    <a href="#" onClick={toggleDropdownnn}>
                      <i
                        className="fa-solid fa-book"
                        style={{ marginBottom: "-0px" }}
                      ></i>{" "}
                      Users
                    </a>

                    <ul
                      id="userDropdown"
                      style={{ display: "none", marginTop: "15px" }}
                    >
                      <a href="/admin/users">
                        <i class="fa fa-users"></i> Users List
                      </a>
                      <br></br>
                      <br></br>
                      <a href="/admin/register">
                        <i class="fa-solid fa-square-plus"></i> Add User
                      </a>
                    </ul>
                  </li>

                  {/* <li>
                    <a href="/admin/users">
                      <i class="fa fa-users"></i> Users
                    </a>
                  </li> */}

                  {/* <li>
                    <a href="/admin/reviews">
                      <i class="fa fa-star" ></i> Reviews
                    </a>
                  </li> */}

                  <li>
                    <a href="/admin/stock-history">
                      <i class="fa-solid fa-warehouse"></i> Stock History
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Sidebar;