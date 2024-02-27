import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { newBalance, clearErrors } from "../../actions/balanceActions";
import { NEW_BALANCE_RESET } from "../../constants/balanceConstants";
import { allCashierUsers } from "../../actions/userActions";

const NewBalance = () => {
    const [selectedStudent, setSelectedStudent] = useState({});
    const [specificBalance, setSpecificBalance] = useState("");
    const [amount, setAmount] = useState("");
    // const [users, setUsers] = useState([]);


    const dispatch = useDispatch();
    let navigate = useNavigate();

    const { loading, error, success } = useSelector((state) => state.newBalance);
    const { users } = useSelector((state) => state.allUsers);

    const message = (message = "") =>
        toast.success(message, {
            position: toast.POSITION.BOTTOM_CENTER,
        });

    useEffect(() => {
        if (error) {
            dispatch(clearErrors());
        }

        if (success) {
            navigate("/cashier/balances");
            message("Balance was successfully recorded");
            dispatch({ type: NEW_BALANCE_RESET });
        }
    }, [dispatch, error, success, navigate]);

    useEffect(() => {
        // Fetch students from the backend
        const fetchUsers = async () => {
            try {
                // Dispatch the action to fetch users
                await dispatch(allCashierUsers());
            } catch (error) {
                console.error("Error fetching Users:", error);
            }
        };

        fetchUsers();
    }, [dispatch, users]);

    const balanceOptions = ["Tuition", "Library_fines", "Cafeteria"];

    const submitHandler = (e) => {
        e.preventDefault();

        if (!selectedStudent || typeof selectedStudent !== "object") {
            // Handle the case where a student is not selected or selectedStudent is not an object
            return;
        }

        const balanceData = {
            userId: selectedStudent._id,
            lastname: selectedStudent.lastname,
            grade: selectedStudent.grade,
            specificBalance,
            amount: parseFloat(amount),
        };

        console.log("Balance Data:", balanceData);

        dispatch(newBalance(balanceData));
    };

    return (
        <Fragment>
            <MetaData title={"New Balance"} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form className="shadow-lg" onSubmit={submitHandler}>
                                <h1 className="mb-4">New Balance</h1>

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
                                    <label htmlFor="specificBalance_field">Specific Balance</label>
                                    <select
                                        id="specificBalance_field"
                                        className="form-control"
                                        value={specificBalance}
                                        onChange={(e) => setSpecificBalance(e.target.value)}
                                    >
                                        <option value="">Select a specific balance</option>
                                        {balanceOptions.map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="amount_field">Amount</label>
                                    <input
                                        type="number"
                                        id="amount_field"
                                        className="form-control"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-block py-3"
                                    disabled={loading ? true : false}
                                >
                                    Record Balance
                                </button>
                            </form>
                        </div>
                    </Fragment>
                </div>
            </div>
        </Fragment>
    );
};

export default NewBalance;
