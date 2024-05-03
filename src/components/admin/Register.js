import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { useDispatch } from "react-redux";
import { register } from "../../actions/userActions";

const Register = () => {
    const [user, setUser] = useState({
        firstname: "",
        lastname: "",
        middlename: "",
        phone: "",
        schoolId: "",
        grade: "",
        schoolYear: "",
        email: "",
        password: "",
        role: "",
    });

    const { firstname, lastname, middlename, phone, schoolId, grade, schoolYear, email, password, role } = user;

    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("/images/default_avatar.jpg");

    const dispatch = useDispatch();
    const navigate = useNavigate();



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
        formData.set("password", password);
        formData.set("avatar", avatar);
        formData.set("role", role); // Include role in form data

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
            <div className="row">
                <div className="col-12 col-md-8 offset-md-2">
                    <div className="wrapper my-5">
                        <form className="shadow-lg" onSubmit={submitHandler} encType="multipart/form-data">
                            <h1 className="mb-4">Register</h1>

                            <div className="form-group">
                                <label htmlFor="firstname_field">First Name</label>
                                <input
                                    type="text"
                                    id="firstname_field"
                                    className="form-control"
                                    name="firstname"
                                    value={firstname}
                                    onChange={onChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="lastname_field">Last Name</label>
                                <input
                                    type="text"
                                    id="lastname_field"
                                    className="form-control"
                                    name="lastname"
                                    value={lastname}
                                    onChange={onChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="middlename_field">Middle Name</label>
                                <input
                                    type="text"
                                    id="middlename_field"
                                    className="form-control"
                                    name="middlename"
                                    value={middlename}
                                    onChange={onChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone_field">Phone</label>
                                <input
                                    type="text"
                                    id="phone_field"
                                    className="form-control"
                                    name="phone"
                                    value={phone}
                                    onChange={onChange}
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
                                    onChange={onChange}
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
                                    onChange={onChange}
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
                                    onChange={onChange}
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
                                    onChange={onChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password_field">Password</label>
                                <input
                                    type="password"
                                    id="password_field"
                                    className="form-control"
                                    name="password"
                                    value={password}
                                    onChange={onChange}
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
                                            accept="images/*"
                                            onChange={onChange}
                                        />
                                        <label className="custom-file-label" htmlFor="customFile">
                                            Choose Avatar
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="role_field">Role</label>
                                <select
                                    id="role_field"
                                    className="form-control"
                                    name="role"
                                    value={role}
                                    onChange={(e) => setUser({ ...user, role: e.target.value })}
                                >
                                    <option value="">Select Role</option>
                                    <option value="student">Student</option>
                                    <option value="alumni">Alumni</option>
                                    <option value="guidance">Guidance</option>
                                    <option value="cashier">Cashier</option>
                                </select>
                            </div>

                            <button type="submit" className="btn btn-block py-3">
                                REGISTER
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Register;
