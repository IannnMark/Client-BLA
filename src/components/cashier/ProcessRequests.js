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
import { getCashierBalance } from "../../actions/balanceActions";

const ProcessRequest = () => {
    const [status, setStatus] = useState("");
    const dispatch = useDispatch();
    let { id } = useParams();
    const { loading, request = {} } = useSelector(
        (state) => state.requestDetails
    );
    const { requestItems, paymentInfo, user, totalPrice, requestStatus } =
        request;
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
        dispatch(getCashierBalance());
        const savedStatus = localStorage.getItem("updatedStatus");
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
        try {
            // Check if the user has a balance
            const studentHasBalance = balances.some(
                (balance) => balance.user._id === user._id && balance.amount !== 0
            );

            if (studentHasBalance) {
                toast.error(
                    `Attention: Student ${user.firstname} ${user.lastname} has a balance.`,
                    {
                        position: toast.POSITION.BOTTOM_CENTER,
                    }
                );
                return;
            }

            const formData = new FormData();
            formData.set("status", status);

            await dispatch(updateCashierRequest(id, formData));
            localStorage.setItem("updatedStatus", status);
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
                            <div
                                className="d-flex justify-content-center align-items-center"
                                style={{ minHeight: "100vh" }}
                            >
                                <div className="col-12 col-lg-8 order-details">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <p className="my-4 track-number">
                                                Tracking Number:{" "}
                                                <span className="underline">
                                                    BLA-
                                                    {request && request._id
                                                        ? request._id.substring(0, 6)
                                                        : ""}
                                                </span>
                                            </p>
                                        </div>
                                        <div className="col-md-5">
                                            <h4 className="statuss">Status</h4>
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
                                    <hr />
                                    <h4 style={{ textAlign: "center" }}> Student Information</h4>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <p className="my-4 student-name">
                                                Requested by:{" "}
                                                {user
                                                    ? `${user.firstname} ${user.lastname}`
                                                    : "Unknown"}
                                            </p>
                                        </div>
                                        <div className="col-md-6">
                                            <p className="my-4 student-name">
                                                Grade & Section: {request.user?.grade || "N/A"}
                                            </p>
                                        </div>
                                    </div>
                                    <hr />
                                    <h4 style={{ textAlign: "center" }}>Request Information</h4>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <p className="my-4 student-name">
                                                Purpose: {request.purpose || "N/A"}
                                            </p>
                                        </div>
                                        <div className="col-md-6">
                                            <p className="my-4 student-name">
                                                Request Status:{" "}
                                                <span
                                                    className={
                                                        requestStatus === "Received"
                                                            ? "greenColor"
                                                            : "redColor"
                                                    }
                                                >
                                                    <b>{requestStatus}</b>
                                                </span>
                                            </p>
                                        </div>
                                        <div className="col-md-6">
                                            <p className="my-4 student-name">
                                                Payment Info: {request.paymentInfo || "N/A"}{" "}
                                            </p>
                                        </div>
                                        <div className="col-md-6">
                                            <p className="my-4 student-name">
                                                Total Amount to Pay:{" "}
                                                <span>
                                                    ₱
                                                    {totalPrice}
                                                </span>
                                            </p>
                                        </div>

                                    </div>
                                    <hr />

                                    <h4 style={{ textAlign: "center" }}>Document Information</h4>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="my-4 students-name">
                                                {requestItems &&
                                                    requestItems.map((item) => (
                                                        <div key={item.document}>
                                                            <p>{item.name}</p>
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="my-4 student-name">
                                                {requestItems &&
                                                    requestItems.map((item) => (
                                                        <div key={item.document} className="my-4 student-namee">

                                                            <p>Price: ₱{item.price}</p>

                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                    </div>
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
