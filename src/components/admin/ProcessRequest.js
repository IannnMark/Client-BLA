import React, { Fragment, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import {
    getRequestDetails,
    updateRequest,
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

    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const errMsg = (message = "") =>
        toast.error(message, {
            position: toast.POSITION.BOTTOM_CENTER,
        });

    const successMsg = (message = "") =>
        toast.success(message, {
            position: toast.POSITION.BOTTOM_CENTER,
        });

    useEffect(() => {
        if (user) {
            console.log('User:', user);
            console.log('User Lastname:', user.lastname);
        }
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
            setStatus(""); // Clear status after a successful update
        }
    }, [dispatch, error, isUpdated, status, requestId]);

    const updateStatusHandler = async () => {
        const formData = new FormData();
        formData.set("status", status);
        formData.set("dateRelease", selectedDate.toISOString());

        try {
            await dispatch(updateRequest(requestId, formData));
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
                                    <h2 className="my-5">Request # {request._id}</h2>

                                    <p>
                                        <b>Amount:</b> ₱{totalPrice}
                                    </p>

                                    <hr />

                                    <h4 className="my-4">Requested by: {user ? user._id : 'Unknown'}</h4>

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

                                    <div className="col-12 col-lg-3 mt-5">
                                        <h4 className="my-4">Date of Release:</h4>
                                        <DatePicker
                                            selected={selectedDate}
                                            onChange={handleDateChange}
                                            dateFormat="MMMM dd, yyyy"
                                            className="form-control"
                                            popperClassName="datepicker-popper"
                                        />
                                    </div>

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
                                            <option value="Approved">Approved</option>
                                            <option value="Received">Received</option>
                                            {/* Add more options based on your requirements */}
                                        </select>
                                    </div>
                                    <button
                                        className="btn btn-primary btn-block"
                                        onClick={updateStatusHandler}
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
