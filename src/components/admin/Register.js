import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { register, clearErrors } from "../../actions/userActions";
import { REGISTER_USER_RESET } from "../../constants/userConstants";
import "./Register.css";

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
    const navigate = useNavigate(); // Initialize useNavigate hook

    const { loading, error, success } = useSelector((state) => state.newUser);

    const message = (message = "") =>
        toast.success(message, {
            position: toast.POSITION.BOTTOM_CENTER,
        });

    useEffect(() => {
        if (error) {
            dispatch(clearErrors());
        }

        if (success) {
            navigate("/admin/users");
            message("User created successfully");
        }
    }, [dispatch, error, success, navigate]);

    const submitHandler = async (e) => {
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
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-8">
                    <div className="wrapper my-5">
                        <form className="shadow-lg custom-form" onSubmit={submitHandler} encType="multipart/form-data">
                            <h1 className="mb-4">Register User</h1>

                            <div className="custom-input-group">
                                <input
                                    type="text"
                                    className="custom-input"
                                    placeholder="First Name"
                                    name="firstname"
                                    value={firstname}
                                    onChange={onChange}
                                />
                                <input
                                    type="text"
                                    className="custom-input"
                                    placeholder="Middle Name"
                                    name="middlename"
                                    value={middlename}
                                    onChange={onChange}
                                />
                            </div>

                            <div className="custom-input-group">
                                <input
                                    type="text"
                                    className="custom-input"
                                    placeholder="Last Name"
                                    name="lastname"
                                    value={lastname}
                                    onChange={onChange}
                                />
                                <input
                                    type="text"
                                    className="custom-input"
                                    placeholder="Phone"
                                    name="phone"
                                    value={phone}
                                    onChange={onChange}
                                />
                            </div>

                            <div className="custom-input-group">
                                <input
                                    type="text"
                                    className="custom-input"
                                    placeholder="School ID"
                                    name="schoolId"
                                    value={schoolId}
                                    onChange={onChange}
                                />
                                <input
                                    type="text"
                                    className="custom-input"
                                    placeholder="Grade"
                                    name="grade"
                                    value={grade}
                                    onChange={onChange}
                                />
                            </div>

                            <div className="custom-input-group">
                                <input
                                    type="text"
                                    className="custom-input"
                                    placeholder="School Year"
                                    name="schoolYear"
                                    value={schoolYear}
                                    onChange={onChange}
                                />
                                <input
                                    type="email"
                                    className="custom-input"
                                    placeholder="Email"
                                    name="email"
                                    value={email}
                                    onChange={onChange}
                                />
                            </div>

                            <div className="custom-input-group">
                                <input
                                    type="password"
                                    className="custom-input"
                                    placeholder="Password"
                                    name="password"
                                    value={password}
                                    onChange={onChange}
                                />
                                <select
                                    className="custom-input"
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

                            <div className="custom-input-group">
                                <div className="avatar-preview">
                                    <img
                                        src={avatarPreview}
                                        className="rounded-circle"
                                        alt="Avatar Preview"
                                    />
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
                                    <label
                                        className="custom-file-label"
                                        htmlFor="customFile"
                                    >
                                        Choose Avatar
                                    </label>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-block py-3 custom-btn">
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
