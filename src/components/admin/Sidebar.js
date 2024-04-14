import React from "react";

import { Link } from "react-router-dom";


const Sidebar = () => {
  return (
    <div className="sidebar-wrapper">
      <navv id="sidebar">
        <ul className="list-unstyled components">
          <li>
            <Link to="/dashboard">
              <i className="fa fa-tachometer"></i> Dashboard
            </Link>
          </li>
          <li>
            <a
              href="#productSubmenu"
              data-toggle="collapse"
              aria-expanded="false"
              className="custom-toggle"
            >
              <i className="fa fa-product-hunt"></i> Products
            </a>

            <ul className="collapse list-unstyled" id="productSubmenu">
              <li>
                <Link to="/admin/products">
                  <i className="fa fa-clipboard"></i> List of Products
                </Link>
                <br />
                <Link to="/admin/product">
                  <i className="fa fa-plus"></i> Create
                </Link>
              </li>
            </ul>
          </li>

          <li>
            <a
              href="#documentSubmenu"
              data-toggle="collapse"
              aria-expanded="false"
              className="custom-toggle"
            >
              <i className="fa fa-file"></i> Documents
            </a>

            <ul className="collapse list-unstyled" id="documentSubmenu">
              <li>
                <Link to="/admin/documents">
                  <i className="fa fa-clipboard"></i> List of Documents
                </Link>
                <br />
                <Link to="/admin/document">
                  <i className="fa fa-plus"></i> Create
                </Link>
              </li>
            </ul>
          </li>

          <li>
            <Link to="/admin/orders">
              <i className="fa fa-shopping-basket"></i> Orders
            </Link>
          </li>

          <li>
            <Link to="/admin/requests">
              <i className="fa fa-file"></i> Requests
            </Link>
          </li>

          <li>
            <Link to="/admin/users">
              <i className="fa fa-users"></i> Users
            </Link>
          </li>

          <li>
            <Link to="/admin/reviews">
              <i className="fa fa-star"></i> Reviews
            </Link>
          </li>


          <li>
            <Link to="/admin/stock-history">
              <i className="fa fa-star"></i> Stock History
            </Link>
          </li>


        </ul>
      </navv>
    </div>
  );
};

export default Sidebar;



