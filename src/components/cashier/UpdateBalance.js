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
    const [amountPaid, setAmountPaid] = useState("");
    const [status, setStatus] = useState("Unsettled");

    const dispatch = useDispatch();
    const { error, balance } = useSelector((state) => state.balanceDetails);
    const { loading, error: updateError, isUpdated } = useSelector(
        (state) => state.balance
    );

    let { id } = useParams();
    let navigate = useNavigate();

    const errMsg = (message = "") =>
        toast.error(message, { position: toast.POSITION.BOTTOM_CENTER });

    const successMsg = (message = "") =>
        toast.success(message, { position: toast.POSITION.BOTTOM_CENTER });

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

        if (error || updateError) {
            errMsg(error || updateError);
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

        if (!balance || !id || !amountPaid) {
            console.error('Invalid input data');
            return;
        }

        const formData = {
            amountPaid,
            status,
        };

        dispatch(updateBalance(id, formData));
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
                            <form className="shadow-lg" onSubmit={submitHandler}>
                                <h1 className="mb-4">Update Balance</h1>

                                <div className="form-group">
                                    <label htmlFor="amountPaid">Amount Paid</label>
                                    <input
                                        type="number"
                                        id="amountPaid"
                                        className="form-control"
                                        value={amountPaid}
                                        onChange={(e) => setAmountPaid(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="status">Status</label>
                                    <select
                                        id="status"
                                        className="form-control"
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                    >
                                        <option value="Unsettled">Unsettled</option>
                                        <option value="Settled">Settled</option>
                                    </select>
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
