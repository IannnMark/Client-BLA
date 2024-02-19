import React, { Fragment, useState, useEffect } from "react";

import MetaData from "../layout/MetaData";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import {
  updateProfile,
  loadUser,
  clearErrors,
} from "../../actions/userActions";

import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";

const UpdateProfile = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [middlename, setMiddlename] = useState("");
  const [phone, setPhone] = useState("");
  const [schoolId, setSchoolid] = useState("");
  const [grade, setGrade] = useState("");
  const [schoolYear, setSchoolyear] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");

  const [avatarPreview, setAvatarPreview] = useState(
    "/images/default_avatar.jpg"
  );

  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { error, isUpdated, loading } = useSelector((state) => state.user);

  // console.log(error)

  useEffect(() => {
    console.log(isUpdated);

    if (user) {
      setFirstname(user.firstname);
      setLastname(user.lastname);
      setMiddlename(user.middlename);
      setPhone(user.phone);
      setSchoolid(user.schoolId);
      setGrade(user.grade);
      setSchoolyear(user.schoolYear);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }

    if (error) {
      // alert.error(error);

      dispatch(clearErrors());
    }

    if (isUpdated) {
      // alert.success('User updated successfully')

      dispatch(loadUser());

      navigate("/me", { replace: true });

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, isUpdated, navigate, user]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("firstname", firstname);
    formData.set("lastname", lastname);
    formData.set("middlename", middlename);
    formData.set("phone", phone);
    formData.set("schoolId", schoolId);
    formData.set("grade", grade);
    formData.set("schoolYear", schoolYear);
    formData.set("email", email);
    formData.set("avatar", avatar);

    dispatch(updateProfile(formData));
  };

  const onChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);

        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <Fragment>
      <MetaData title={"Update Profile"} />

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form
            className="shadow-lg"
            onSubmit={submitHandler}
            encType="multipart/form-data"
          >
            <h1 className="mt-2 mb-5">Update Profile</h1>

            <div className="form-group">
              <label htmlFor="firstname_field">First Name</label>

              <input
                type="firstname"
                id="firstname_field"
                className="form-control"
                name='firstname'
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastname_field">Last Name</label>

              <input
                type="lastname"
                id="lastname_field"
                className="form-control"
                name="lastname"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="middlename_field">Middle Name</label>

              <input
                type="middlename"
                id="middlename_field"
                className="form-control"
                name="middlename"
                value={middlename}
                onChange={(e) => setMiddlename(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone_field">Phone</label>

              <input
                type="phone"
                id="phone_field"
                className="form-control"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="schoolId_field">School ID</label>

              <input
                type="schoolId"
                id="schoolId_field"
                className="form-control"
                name="schoolId"
                value={schoolId}
                onChange={(e) => setSchoolid(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="grade_field">Grade</label>

              <input
                type="grade"
                id="grade_field"
                className="form-control"
                name="grade"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="schoolYear_field">School Year</label>

              <input
                type="schoolYear"
                id="schoolYear_field"
                className="form-control"
                name="schoolYear"
                value={schoolYear}
                onChange={(e) => setSchoolyear(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email_field">Email</label>

              <input
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="avatar_upload">Avatar</label>

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
                    accept="image/*"
                    onChange={onChange}
                  />

                  <label className="custom-file-label" htmlFor="customFile">
                    Choose Avatar
                  </label>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn update-btn btn-block mt-4 mb-3"
              disabled={loading ? true : false}
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProfile;