import React, { Fragment, useState, useEffect } from "react";
import "../../App.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaShoppingCart, FaBell } from "react-icons/fa";
import { logout } from "../../actions/userActions";

const Header = () => {
  const [isSticky, setSticky] = useState(false);
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const { requestDocuments } = useSelector((state) => state.request);

  const logoutHandler = () => {
    dispatch(logout());
  };

  useEffect(() => {
    const handleScroll = () => {
      console.log('Scrolling...', window.scrollY);
      setSticky(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navbarClass = isSticky ? "navbar row sticky-navbar" : "navbar row";

  const iconStyle = { fontSize: "1.5rem", color: "#9C865C" };
  const productsLinkStyle = { color: "black", fontFamily: "Arial" };

  return (
    <Fragment>

      <nav className={navbarClass}>
        <div className="col-12 col-md-3">
          <div className="navbar-brand">
            <Link to="/">
              <img src="/images/school_logo.png" alt="School Logo" />
              <span className="lg-3"> Blessed Land Academy of Taguig</span>
            </Link>
          </div>
        </div>

        <div className="col-12 col-md-3 mt-4 mt-md-0 d-flex justify-content-end align-items-center">
          {user && user.role !== "admin" && user.role !== "guidance" && (
            <Link
              to="/cart"
              style={{ textDecoration: "none" }}
              className="d-flex align-items-center"
            >
              <span id="cart" className="ml-3 icon" style={iconStyle}>
                <FaShoppingCart />
              </span>
              <span
                className="ml-1"
                id="cart_count"
                style={{ fontSize: "1rem" }}
              >
                {cartItems.length}
              </span>
            </Link>
          )}

          {user && (user.role === "student" || user.role === "alumni") && (
            <Link
              to="/request"
              style={{ textDecoration: "none" }}
              className="d-flex align-items-center"
            >
              <span id="request" className="ml-3 icon" style={iconStyle}>
                <FaBell />
              </span>
              <span
                className="ml-1"
                id="request_count"
                style={{ fontSize: "1rem" }}
              >
                {requestDocuments.length}
              </span>
            </Link>
          )}

          <Link to="/products">
            <span id="product" className="ml-3">
              Products
            </span>
          </Link>


          <Link to="/announcement">
            <span id="announcement" className="ml-3">
              Announcement
            </span>
          </Link>

          <Link className="mx-3" to="/aboutUs">
            About
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

                {user && user.role === "cashier" && (
                  <Link className="dropdown-item" to="cashier/balances">
                    Dashboard
                  </Link>
                )}
                {user && (user.role === "student" || user.role === "alumni") && (
                  <Link className="dropdown-item" to="/orders/me">
                    Orders
                  </Link>
                )}

                {user && (user.role === "student" || user.role === "alumni") && (
                  <Link className="dropdown-item" to="/requests/me">
                    Requests
                  </Link>
                )}

                {user && user.role === "student" && (
                  <Link className="dropdown-item" to="/clearance">
                    Clearance
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
              <Link to="/login" id="login" className="login-nav">
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