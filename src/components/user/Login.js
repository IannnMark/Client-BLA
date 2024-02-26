import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import "react-toastify/dist/ReactToastify.css";

import { useDispatch, useSelector } from "react-redux";
import { login, clearErrors } from "../../actions/userActions";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let location = useLocation();
  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );
  // const redirect = location.search ? location.search.split("=")[1] : "";
  const redirect = new URLSearchParams(location.search).get("redirect");
  useEffect(() => {
    if (isAuthenticated && redirect === "shipping") {
      navigate(`/${redirect}`, { replace: true });
    } else if (isAuthenticated) navigate("/");
    if (error) {
      // alert.error(error);

      dispatch(clearErrors());
    }
  }, [dispatch, isAuthenticated, error, navigate, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Login"} />

          <div
            className="row wrapper"
            style={{
              // background:
              //   "linear-gradient(90deg, rgba(255, 222, 89, 1) 9%, rgba(255, 145, 77, 1) 86%)",
              backgroundImage: `url(${process.env.PUBLIC_URL}/images/login.svg)`,
              backgroundSize: "cover",
              minHeight: "70vh",
              margin: 0,
              padding: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className="col-10 col-lg-5">
              <form
                className="shadow-lg"
                onSubmit={submitHandler}
                style={{
                  backgroundColor: "rgba(255, 222, 89, 0.20)", // Adjust the alpha value as needed
                  padding: "37px", // Adjust padding as needed
                }}
              >
                <h1 className="mb-3">Login</h1>
                <div className="form-group">
                  <label htmlFor="email_field">Email</label>
                  <input
                    type="email"
                    id="email_field"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password_field">Password</label>
                  <input
                    type="password"
                    id="password_field"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                  />
                </div>

                <Link to="/password/forgot" className="float-right mb-4">
                  Forgot Password?
                </Link>

                <button
                  id="login_button"
                  type="submit"
                  className="btn btn-block py-2"
                >
                  LOGIN
                </button>

                <Link to="/register" className="float-right mt-3">
                  New User?
                </Link>
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Login;
