import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { register, clearErrors } from "../../actions/userActions";
import "./Register.css";

const Register = () => {
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    phone: "",
    address: "",
    town: "",
    city: "",
    schoolId: "", // Added schoolId field
    email: "",
    password: "",
  });

  const {
    fname,
    lname,
    phone,
    address,
    town,
    city,
    schoolId,
    email,
    password,
  } = user;

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "/images/default_avatar.jpg"
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }

    if (error) {
      dispatch(clearErrors());
    }
  }, [dispatch, isAuthenticated, error, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("fname", fname);
    formData.set("lname", lname);
    formData.set("phone", phone);
    formData.set("address", address);
    formData.set("town", town);
    formData.set("city", city);
    formData.set("schoolId", schoolId); // Added schoolId field
    formData.set("email", email);
    formData.set("password", password);
    formData.set("avatar", avatar);

    dispatch(register(formData));
  };

  const onChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  return (
    <Fragment>
      <MetaData title={"Register User"} />

      <div
        className="row wrapper"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/images/login.svg)`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          margin: 0,
          padding: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="col-12 col-md-8 col-lg-6 custom-column">
          <form
            onSubmit={submitHandler}
            encType="multipart/form-data"
            style={{
              width: "100%",
              backgroundColor: "rgba(255, 222, 89, 0.20)",
            }}
          >
            <h1 className="mb-3" style={{ fontFamily: "fantasy" }}>
              Register
            </h1>

            <div className="row mb-3">
              <div className="col-md-6 mb-3">
                <label htmlFor="fname_field" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  id="fname_field"
                  className="form-control"
                  name="fname"
                  value={fname}
                  onChange={onChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="lname_field" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lname_field"
                  className="form-control"
                  name="lname"
                  value={lname}
                  onChange={onChange}
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6 mb-3">
                <label htmlFor="phone_field" className="form-label">
                  Phone
                </label>
                <input
                  type="text"
                  id="phone_field"
                  className="form-control"
                  name="phone"
                  value={phone}
                  onChange={onChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="address_field" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  id="address_field"
                  className="form-control"
                  name="address"
                  value={address}
                  onChange={onChange}
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6 mb-3">
                <label htmlFor="town_field" className="form-label">
                  Town
                </label>
                <input
                  type="text"
                  id="town_field"
                  className="form-control"
                  name="town"
                  value={town}
                  onChange={onChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="city_field" className="form-label">
                  City
                </label>
                <input
                  type="text"
                  id="city_field"
                  className="form-control"
                  name="city"
                  value={city}
                  onChange={onChange}
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6 mb-3">
                <label htmlFor="schoolId_field" className="form-label">
                  School ID
                </label>
                <input
                  type="text"
                  id="schoolId_field"
                  className="form-control"
                  name="schoolId"
                  value={schoolId}
                  onChange={onChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="email_field" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email_field"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChange}
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6 mb-3">
                <label htmlFor="password_field" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password_field"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="avatar_upload" className="form-label">
                  Avatar
                </label>
                <div className="d-flex align-items-center">
                  <div>
                    <figure className="avatar mr-3 item-rtl">
                      <img
                        src={avatarPreview}
                        className="rounded-circle"
                        alt="Avatar Preview"
                      />
                    </figure>
                  </div>
                  <div className="custom-file">
                    <input
                      type="file"
                      name="avatar"
                      className="custom-file-input"
                      id="customFile"
                      accept="images/*"
                      onChange={onChange}
                    />
                    <label className="custom-file-label" htmlFor="customFile">
                      Choose Avatar
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mb-3">
              <div
                className="col-md-12 mb-3"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  columnGap: "10px",
                }}
              >
                <button
                  id="register_button"
                  type="submit"
                  className="btn btn-block py-2"
                  style={{
                    backgroundColor: "#9c865c",
                    color: "#2e1c1a",
                    fontFamily: "fantasy, sans-serif",
                    fontSize: "1em",
                    fontWeight: "semi bold",
                  }}
                  disabled={loading ? true : false}
                >
                  REGISTER
                </button>

                <button
                  type="button"
                  className="btn btn-secondary py-2"
                  onClick={() => navigate("/login")}
                  style={{
                    backgroundColor: "#9c865c",
                    color: "#2e1c1a",
                    fontFamily: "fantasy, sans-serif",
                    fontSize: "1em",
                    fontWeight: "semi bold",
                  }}
                >
                  Go to Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
