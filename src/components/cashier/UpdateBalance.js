import React, { Fragment, useState, useEffect } from "react";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateBalance, clearErrors, getBalanceDetails } from "../../actions/balanceActions";
import { UPDATE_BALANCE_RESET } from "../../constants/balanceConstants";

const UpdateBalance = () => {
    const [specificBalance, setSpecificBalance] = useState("");
    const [amount, setAmount] = useState("");

    const dispatch = useDispatch();
    const balanceState = useSelector((state) => state.balance);
    const { error, balance } = useSelector((state) => state.balanceDetails);
    const { loading, error: updateError, isUpdated } = useSelector(
        (state) => state.balance
    );

    let { id } = useParams();
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
        const fetchData = async () => {
            try {
                await dispatch(getBalanceDetails(id));
            } catch (error) {
                errMsg(`Error fetching balance details: ${error.message}`);
                dispatch(clearErrors());
            }
        };

        fetchData();

        if (error) {
            errMsg(error);
            dispatch(clearErrors());
        }

        if (updateError) {
            errMsg(updateError);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            navigate("/cashier/balances");
            successMsg("Balance updated successfully");
            dispatch({ type: UPDATE_BALANCE_RESET });
        }
    }, [dispatch, id, error, updateError, isUpdated, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();

        if (!balance || !id) {
            console.error('Balance or ID is undefined');
            return;
        }

        if (!specificBalance || !amount) {
            console.error('Specific Balance or Amount is undefined');
            return;
        }

        const formData = {
            specificBalance,
            amount,
        };

        dispatch(updateBalance(balance._id, formData));
    };

    return (
        <Fragment>
            <MetaData title={"Update Balance"} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form
                                className="shadow-lg"
                                onSubmit={submitHandler}
                            >
                                <h1 className="mb-4">Update Balance</h1>

                                <div className="form-group">
                                    <label htmlFor="specific_balance_field">Specific Balance</label>
                                    <select
                                        id="specific_balance_field"
                                        className="form-control"
                                        value={specificBalance}
                                        onChange={(e) => setSpecificBalance(e.target.value)}
                                    >
                                        <option value="" disabled>Select Specific Balance</option>
                                        <option value="Tuition">Tuition</option>
                                        <option value="Library_fines">Library Fines</option>
                                        <option value="Cafeteria">Cafeteria</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="amount_field">Amount</label>
                                    <input
                                        type="text"
                                        id="amount_field"
                                        className="form-control"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                    />
                                </div>

                                <button
                                    id="update_button"
                                    type="submit"
                                    className="btn btn-block py-3"
                                    disabled={loading ? true : false}
                                >
                                    UPDATE
                                </button>
                            </form>
                        </div>
                    </Fragment>
                </div>
            </div>
        </Fragment>
    );
};

export default UpdateBalance;
