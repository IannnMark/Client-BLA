import React, { Fragment } from "react";
import "../../App.css";
import Search from "./Search";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaShoppingCart, FaBell } from "react-icons/fa";

import { logout } from "../../actions/userActions";

const Header = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const { requestDocuments } = useSelector((state) => state.request)


  const logoutHandler = () => {
    dispatch(logout());
  };

  const iconStyle = { fontSize: "1.5rem", color: "#9C865C" };
  const productsLinkStyle = { color: "black", fontFamily: "Arial" };

  return (
    <Fragment>
      <nav className="navbar row">
        <div className="col-12 col-md-3">
          <div className="navbar-brand">
            <Link to="/">
              <img src="/images/school_logo.png" alt="School Logo" />
            </Link>
          </div>
        </div>
        <div className="col-12 col-md-6 mt-2 mt-md-0">
          <Search />
        </div>

        <div className="col-12 col-md-3 mt-4 mt-md-0 d-flex justify-content-end align-items-center">
          {user && user.role !== "admin" && user.role !== "guidance" && (
            <Link to="/cart" style={{ textDecoration: "none" }} className="d-flex align-items-center">
              <span id="cart" className="ml-3 icon" style={iconStyle}>
                <FaShoppingCart />
              </span>
              <span className="ml-1" id="cart_count" style={{ fontSize: "1rem" }}>
                {cartItems.length}
              </span>
            </Link>
          )}

          {user && user.role === "user" && (
            <Link to="/request" style={{ textDecoration: "none" }} className="d-flex align-items-center">
              <span id="request" className="ml-3 icon" style={iconStyle}>
                <FaBell />
              </span>
              <span className="ml-1" id="request_count" style={{ fontSize: "1rem" }}>
                {requestDocuments.length}
              </span>
            </Link>
          )}

          <Link to="/products" style={{ textDecoration: "none" }}>
            <span id="product" className="ml-3" style={productsLinkStyle}>
              Products
            </span>
          </Link>

          {user ? (
            <div className="ml-4 dropdown d-inline">
              <Link
                to="#!"
                className="btn dropdown-toggle text-white mr-4"
                type="button"
                id="dropDownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <figure className="avatar avatar-nav">
                  <img
                    src={user.avatar && user.avatar.url}
                    alt={user && user.name}
                    className="rounded-circle"
                  />
                </figure>
                <span>{user && user.name}</span>
              </Link>
              <div
                className="dropdown-menu"
                aria-labelledby="dropDownMenuButton"
              >
                {user && user.role === "admin" && (
                  <Link className="dropdown-item" to="/dashboard">
                    Dashboard
                  </Link>
                )}

                {user && user.role === "guidance" && (
                  <Link className="dropdown-item" to="guidance/violations">
                    Dashboard
                  </Link>
                )}


                {user && user.role === "user" && (
                  <Link className="dropdown-item" to="/orders/me">
                    Orders
                  </Link>
                )}

                {user && user.role === "user" && (
                  <Link className="dropdown-item" to="/requests/me">
                    Requests
                  </Link>
                )}

                <Link className="dropdown-item" to="/me">
                  Profile
                </Link>

                <Link
                  className="dropdown-item text-danger"
                  to="/"
                  onClick={logoutHandler}
                >
                  Logout
                </Link>
              </div>
            </div>
          ) : (
            !loading && (
              <Link to="/login" className="btn ml-4" id="login_btn">
                Login
              </Link>
            )
          )}
        </div>
      </nav>
    </Fragment>
  );
};

export default Header;

