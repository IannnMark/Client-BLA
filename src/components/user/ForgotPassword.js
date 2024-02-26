import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MetaData from "../layout/MetaData";
import { forgotPassword, clearErrors } from "../../actions/userActions";
import { useNavigate } from "react-router-dom"; // Import useNavigate

import "./ForgotPassword.css"; // Import the CSS file for styling

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Create a navigate function

  const { error, loading, message } = useSelector(
    (state) => state.forgotPassword
  );

  const success = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  const notify = (error = "") =>
    toast.error(error, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  useEffect(() => {
    if (error) {
      notify(error);
      dispatch(clearErrors());
    }

    if (message) {
      success(message);
    }
  }, [dispatch, error, message]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("email", email);
    dispatch(forgotPassword(formData));
  };

  return (
    <Fragment>
      <MetaData title={"Forgot Password"} />

      <div
        className="row wrapper-forgot-password"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/images/login.svg)`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "9rem",
        }}
      >
        <div className="col-12 col-md-6 col-lg-4">
          <form
            className="shadow-lg forgot-password-form"
            style={{
              marginTop: "-60%",
              width: "120%",
              height: "300px",
            }}
            onSubmit={submitHandler}
          >
            <h1>Forgot Password</h1>

            <div className="form-group">
              <label htmlFor="email_field">Enter Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control form-control-sm" // Apply the form-control-sm class
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="row">
              <div className="col-12">
                <button
                  id="forgot_password_button"
                  type="submit"
                  className="btn btn-block btn-sm py-2" // Apply the btn-sm class
                  style={{
                    background:
                   "linear-gradient(90deg, rgba(255, 222, 89, 1) 9%, rgba(255, 145, 77, 1) 86%)",
                    fontFamily: "Franklin Gothic Medium, sans-serif",
                    fontSize: "1em",
                    fontWeight: "bold",
                    height: "40px",
                    borderRadius: "25px",
                  }} // Set a fixed height
                  disabled={loading ? true : false}
                >
                  Send Email
                </button>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-12">
                {/* Add the back button */}
                <button
                  type="button"
                  className="btn btn-secondary btn-block btn-sm py-2"
                  onClick={() => navigate("/login")}
                  style={{
                    background:
                   "linear-gradient(90deg, rgba(255, 222, 89, 1) 9%, rgba(255, 145, 77, 1) 86%)",
                    fontFamily: "Franklin Gothic Medium, sans-serif",
                    fontSize: "1em",
                    fontWeight: "semi bold",
                    height: "40px",
                    borderRadius: "25px",
                    color: "black",
                  }} // Set a fixed height
                >
                  Back to Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default ForgotPassword;
