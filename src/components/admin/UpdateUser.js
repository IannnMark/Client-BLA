import React, { Fragment, useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

import MetaData from "../layout/MetaData";

import Sidebar from "./Sidebar";

import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { useDispatch, useSelector } from "react-redux";

import {
  updateUser,
  getUserDetails,
  clearErrors,
} from "../../actions/userActions";

import { UPDATE_USER_RESET } from "../../constants/userConstants";

const UpdateUser = () => {
  const [firstname, setFname] = useState("");
  const [lastname, setLname] = useState("");
  const [middlename, setMname] = useState("");
  const [phone, setPhone] = useState("");
  const [schoolId, setSchoolid] = useState("");
  const [grade, setGrade] = useState("");
  const [schoolYear, setSchoolyear] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const dispatch = useDispatch();

  const { error, isUpdated } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.userDetails);
  const { id } = useParams();
  let navigate = useNavigate();

  const errMsg = (message = "") =>
    toast.error(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  const successMsg = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  useEffect(() => {
    if (user && user._id !== id) {
      dispatch(getUserDetails(id));
    } else {
      setFname(user.firstname);
      setLname(user.lastname);
      setMname(user.middlename)
      setPhone(user.phone);
      setSchoolid(user.schoolId);
      setGrade(user.grade);
      setSchoolyear(user.schoolYear);
      setEmail(user.email);
      setRole(user.role);
    }

    if (error) {
      errMsg(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      successMsg("User updated successfully");
      navigate("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, error, isUpdated, navigate, id, user]);

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
    formData.set("role", role);

    dispatch(updateUser(user._id, formData));
  };


  return (
    <Fragment>
      <MetaData title={`Update User`} />

      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <div className="row wrapper">
            <div className="col-10 col-lg-5">
              <form className="shadow-lg" onSubmit={submitHandler}>
                <h1 className="mt-2 mb-5">Update User</h1>

                <div className="form-group">
                  <label htmlFor="firstname_field">First Name</label>

                  <input
                    type="firstname"
                    id="firstname_field"
                    className="form-control"
                    name="firstname"
                    value={firstname}
                    onChange={(e) => setFname(e.target.value)}
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
                    onChange={(e) => setLname(e.target.value)}
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
                    onChange={(e) => setMname(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone_field">Phone</label>

                  <input
                    type="number"
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
                    type="text"
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
                    type="text"
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
                    type="text"
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
                  <label htmlFor="role_field">Role</label>

                  <select
                    id="role_field"
                    className="form-control"
                    name="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="user">user</option>

                    <option value="admin">admin</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="btn update-btn btn-block mt-4 mb-3"
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateUser;
