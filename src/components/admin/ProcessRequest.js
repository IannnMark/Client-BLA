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
import "./admin.css";

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

    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const calculateTotal = () => {
        let total = 0;
        if (requestItems) {
            requestItems.forEach((item) => {
                total += item.price;
            });
        }
        return total.toFixed(2);
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
            console.log("User:", user);
            console.log("User Lastname:", user.lastname);
        }
        dispatch(getRequestDetails(requestId));
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
            setStatus(""); // Clear status after a successful update
        }
    }, [dispatch, error, isUpdated, status, requestId]);

    const updateStatusHandler = async () => {
        const formData = new FormData();
        formData.set("status", status);
        formData.set("dateRelease", selectedDate.toISOString());

        try {
            await dispatch(updateRequest(requestId, formData));
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

                <div className="col-12 col-md-10 custom-parent-div">
                    <Fragment>
                        {loading ? (
                            <Loader />
                        ) : (
                            <div
                                className="d-flex justify-content-center align-items-center"
                                style={{ minHeight: "100vh" }}
                            >
                                <div className="col-12 col-lg-8 order-details">
                                    {/* <h2 className="my-5">Request  {request._id}</h2> */}

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

                                    {/* <p>
                    <b>Amount:</b> â‚±{totalPrice}
                  </p> */}

                                    <hr />

                                    {/* <h4 className="my-4">
                    Requested by:{" "}
                    {user ? `${user.firstname} ${user.lastname}` : "Unknown"}
                  </h4> */}

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
                                        {/* <div className="col-md-12 text-center"> 
                      <p className="my-4 student-name">
                       Purpose: {" "}
                       {request.purpose || "N/A"}
                      </p>
                    </div> */}
                                        {/* <div className="col-md-6">
                      <p className="my-4 student-name">
                       Payment Info: {" "}
                       {paymentInfo ? paymentInfo.type : "N/A" }
                      </p>
                    </div> */}
                                    </div>
                                    <hr />

                                    {/* <h4 className="my-4">Payment</h4>
                  {paymentInfo ? (
                    <div>
                      <p>
                        <b>Type:</b> {paymentInfo.type}
                      </p>
                    </div>
                  ) : (
                    <p>
                      <b>Payment Information:</b> N/A
                    </p>
                  )} */}

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

                                                    {Number(calculateTotal()).toLocaleString("en-US", {
                                                        minimumFractionDigits: 2,
                                                    })}
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

                                                            <p>Price: {item.price}</p>

                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                    </div>

                                    <hr />


                                    <div className="text-center">
                                        <h4 className="my-4">Schedule a Date of Release:</h4>
                                    </div>
                                    <div style={{ textAlign: 'center' }}> {/* Set a minimum width for the DatePicker */}
                                        <DatePicker
                                            selected={selectedDate}
                                            onChange={handleDateChange}
                                            dateFormat="MMMM dd, yyyy"
                                            className="form-control"
                                            popperClassName="datepicker-popper"
                                        />
                                    </div>




                                    {/* <h4 className="my-4">Request Status:</h4>

                  <p
                    className={
                      requestStatus === "Received" ? "greenColor" : "redColor"
                    }
                  >
                    <b>{requestStatus}</b>
                  </p> */}

                                    {/* <div className="col-12 col-lg-3 mt-5">
                    <h4 className="my-4">Date of Release:</h4>
                    <DatePicker
                      selected={selectedDate}
                      onChange={handleDateChange}
                      dateFormat="MMMM dd, yyyy"
                      className="form-control"
                      popperClassName="datepicker-popper"
                    />
                  </div> */}

                                    {/* <div className="cart-item my-1">
                    {requestItems &&
                      requestItems.map((item) => (
                        <div key={item.document} className="row my-5">
                          <div className="col-5 col-lg-5">{item.name}</div>

                          <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                            <p>${item.price}</p>
                          </div>
                        </div>
                      ))}
                  </div> */}
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