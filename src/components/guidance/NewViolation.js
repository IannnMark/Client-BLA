import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { newViolation, clearErrors } from "../../actions/violationActions";
import { NEW_VIOLATION_RESET } from "../../constants/violationConstants";
import axios from "axios";

const NewViolation = () => {
    const [selectedStudent, setSelectedStudent] = useState({});
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [users, setUsers] = useState([]);

    const dispatch = useDispatch();
    let navigate = useNavigate();

    const { loading, error, success } = useSelector((state) => state.newViolation);

    const message = (message = "") =>
        toast.success(message, {
            position: toast.POSITION.BOTTOM_CENTER,
        });

    useEffect(() => {
        if (error) {
            dispatch(clearErrors());
        }

        if (success) {
            navigate("/guidance/violations");
            message("Violation was successfully recorded");
            dispatch({ type: NEW_VIOLATION_RESET });
        }
    }, [dispatch, error, success, navigate]);

    useEffect(() => {
        // Fetch students from the backend
        const fetchUsers = async () => {
            try {
                const response = await axios.get("/api/v1/guidance/users");
                setUsers(response.data.users);
            } catch (error) {
                console.error("Error fetching Users:", error);
            }
        };

        fetchUsers();
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();

        if (!selectedStudent || typeof selectedStudent !== "object") {
            // Handle the case where a student is not selected or selectedStudent is not an object
            return;
        }

        const violationData = {
            userId: selectedStudent._id,
            lastname: selectedStudent.lastname,
            grade: selectedStudent.grade,
            type,
            description,
        };

        console.log("Violation Data:", violationData);

        dispatch(newViolation(violationData));
    };

    return (
        <Fragment>
            <MetaData title={"New Violation"} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form className="shadow-lg" onSubmit={submitHandler}>
                                <h1 className="mb-4">New Violation</h1>

                                <div className="form-group">
                                    <label htmlFor="student_dropdown">Select Student</label>
                                    <select
                                        id="student_dropdown"
                                        className="form-control"
                                        value={selectedStudent._id}
                                        onChange={(e) => {
                                            const selectedUser = users.find(
                                                (user) => user._id === e.target.value
                                            );
                                            setSelectedStudent(selectedUser || {});
                                        }}
                                    >
                                        <option value="">Select a student</option>
                                        {users.map((user) => (
                                            <option key={user._id} value={user._id}>
                                                {user.firstname} {user.lastname} - Grade {user.grade}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="type_field">Violation Type</label>
                                    <input
                                        type="text"
                                        id="type_field"
                                        className="form-control"
                                        value={type}
                                        onChange={(e) => setType(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="description_field">Description</label>
                                    <textarea
                                        id="description_field"
                                        className="form-control"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-block py-3"
                                    disabled={loading ? true : false}
                                >
                                    Record Violation
                                </button>
                            </form>
                        </div>
                    </Fragment>
                </div>
            </div>
        </Fragment>
    );
};

export default NewViolation;
