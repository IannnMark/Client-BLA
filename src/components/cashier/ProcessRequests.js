import React, { Fragment, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import {
    getRequestDetails,
    updateCashierRequest,
    clearErrors,
} from "../../actions/inquiriesActions";

import { UPDATE_REQUEST_RESET } from "../../constants/inquiriesConstants";

const ProcessRequest = () => {
    const [status, setStatus] = useState("");
    const dispatch = useDispatch();
    let { id } = useParams();
    const { loading, request = {} } = useSelector((state) => state.requestDetails);
    const { requestItems, paymentInfo, user, totalPrice, requestStatus } = request;
    const { error, isUpdated } = useSelector((state) => state.request);
    const requestId = id;
    const { balances } = useSelector((state) => state.balances); // Assuming balances are available in Redux state

    const errMsg = (message = "") =>
        toast.error(message, {
            position: toast.POSITION.BOTTOM_CENTER,
        });

    const successMsg = (message = "") =>
        toast.success(message, {
            position: toast.POSITION.BOTTOM_CENTER,
        });

    useEffect(() => {
        dispatch(getRequestDetails(requestId));
        const savedStatus = localStorage.getItem('updatedStatus');
        if (savedStatus) {
            setStatus(savedStatus);
        }
    }, [dispatch, requestId]);

    useEffect(() => {
        if (error) {
            errMsg(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            successMsg(`Request updated successfully. New Status: ${status}`);
            dispatch({ type: UPDATE_REQUEST_RESET });
            setStatus("");
        }
    }, [dispatch, error, isUpdated, status, requestId]);

    const updateStatusHandler = async (id) => {
        const formData = new FormData();
        formData.set("status", status);

        try {

            if (status === "Approved") {
                // Check if the user has a balance
                if (balances && balances.length > 0) {
                    const studentHasBalance = balances.some(balance => balance.user._id === user._id);
                    if (studentHasBalance) {
                        toast.info(`Attention: Student ${user.firstname} ${user.lastname} has a balance.`);
                        return;
                    }
                }
            }

            await dispatch(updateCashierRequest(id, formData));
            localStorage.setItem('updatedStatus', status);
            dispatch(getRequestDetails(requestId));
            successMsg(`Request updated successfully. New Status: ${status}`);
        } catch (error) {
            console.error("Update request failed:", error);
        }
    };


    return (
        <Fragment>
            <MetaData title={`Process Request # ${request && request._id}`} />

            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        {loading ? (
                            <Loader />
                        ) : (
                            <div className="row d-flex justify-content-around">
                                <div className="col-12 col-lg-7 order-details">
                                    {/* <h2 className="my-5">Request # {request._id}</h2> */}
                                    <hr />
                                    <p>
                                        <b>Amount:</b> ${totalPrice}
                                    </p>

                                    <hr />

                                    <h4 className="my-4">Requested by: {user ? user.lastname : 'Unknown'}</h4>

                                    {/* <h4 className="my-4">Payment</h4>
                                    <p
                                        className={
                                            request.paymentInfo &&
                                            String(request.paymentInfo)
                                        }
                                    >
                                        <b>{paymentInfo}</b>
                                    </p> */}
                                    <h4 className="my-4">Payment</h4>
                                    {paymentInfo ? (
                                        <div>
                                            <p><b>Type:</b> {paymentInfo.type}</p>
                                        </div>
                                    ) : (
                                        <p><b>Payment Information:</b> N/A</p>
                                    )}


                                    <h4 className="my-4">Request Status:</h4>

                                    <p className={requestStatus === "Received" ? "greenColor" : "redColor"}>
                                        <b>{requestStatus}</b>
                                    </p>
                                    <h4 className="my-4">Request Items:</h4>

                                    <hr />

                                    <div className="cart-item my-1">
                                        {requestItems &&
                                            requestItems.map((item) => (
                                                <div key={item.document} className="row my-5">
                                                    <div className="col-4 col-lg-2">
                                                        <img
                                                            src={item.image}
                                                            alt={item.name}
                                                            height="45"
                                                            width="65"
                                                        />
                                                    </div>

                                                    <div className="col-5 col-lg-5">
                                                        <Link to={`/documents/${item.document}`}>
                                                            {item.name}
                                                        </Link>
                                                    </div>

                                                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                        <p>${item.price}</p>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                    <hr />
                                </div>
                                <div className="col-12 col-lg-3 mt-5">
                                    <h4 className="my-4">Status</h4>
                                    <div className="form-group">
                                        <select
                                            className="form-control"
                                            name="status"
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Approved">Approved</option>
                                            <option value="Pending Balance">Attention: Pending Balance 🚨</option>
                                        </select>
                                    </div>
                                    <button
                                        className="btn btn-primary btn-block"
                                        onClick={() => updateStatusHandler(request._id)}
                                    >
                                        Update Status
                                    </button>
                                </div>

                            </div>
                        )}
                    </Fragment>
                </div>
            </div>
        </Fragment>
    );
};

export default ProcessRequest;
