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
  getOrderDetails,
  updateOrder,
  clearErrors,
} from "../../actions/orderActions";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";
import "./admin.css";

const ProcessOrder = () => {
  const [status, setStatus] = useState("");
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  const dispatch = useDispatch();
  let { id } = useParams();

  const { loading, order = {} } = useSelector((state) => state.orderDetails);
  const { orderItems, totalPrice, orderStatus, user } = order;
  const { error, isUpdated } = useSelector((state) => state.order);

  const orderId = id;

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
      console.log("User:", user);
      console.log("User Lastname:", user.lastname);
    }
    dispatch(getOrderDetails(orderId));
    const savedStatus = localStorage.getItem("updatedStatus");
    if (savedStatus) {
      setStatus(savedStatus);
    }
  }, [dispatch, orderId]);

  useEffect(() => {
    dispatch(getOrderDetails(orderId));

    if (error) {
      errMsg(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      successMsg(`Order updated successfully. New Status: ${status}`);
      dispatch({ type: UPDATE_ORDER_RESET });
    }
  }, [dispatch, error, isUpdated, status, orderId]);

  const updateOrderHandler = async (id) => {
    const formData = new FormData();

    formData.set("status", status);
    formData.set("dateRelease", selectedDate.toISOString());

    try {
      setLoadingUpdate(true);
      await dispatch(updateOrder(id, formData));
      localStorage.setItem("updatedStatus", status);
      successMsg(`Order updated successfully. New Status: ${status}`);
    } catch (error) {
      console.error("Update order failed:", error);
      errMsg("Failed to update order. Please try again.");
    } finally {
      setLoadingUpdate(false);
    }
  };

  return (
    <Fragment>
      <MetaData title={`Process Order # ${order && order._id}`} />

      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10 custom-parent-div">
          <Fragment>
            {loading ? (
              <Loader />
            ) : (
              // <div className="row d-flex justify-content-around">
              //   <div className="col-12 col-lg-7 order-details">
              //     <h2 className="my-5">Order # {order._id}</h2>

              //     <p>
              //       <b>Amount:</b> â‚±{totalPrice}
              //     </p>

              //     <hr />

              //     <h4 className="my-4">Payment</h4>
              //     {order.paymentInfo ? (
              //       <div>
              //         <p><b>Type:</b> {order.paymentInfo.type}</p>
              //       </div>
              //     ) : (
              //       <p><b>Payment Information:</b> N/A</p>
              //     )}

              //     <h4 className="my-4">Order Status:</h4>
              //     <p
              //       className={
              //         order.orderStatus &&
              //           String(order.orderStatus).includes("Received")
              //           ? "greenColor"
              //           : "redColor"
              //       }
              //     >
              //       <b>{orderStatus}</b>
              //     </p>

              //     <div className="col-12 col-lg-3 mt-5">
              //       <h4 className="my-4">Date of Release:</h4>
              //       <DatePicker
              //         selected={selectedDate}
              //         onChange={handleDateChange}
              //         dateFormat="MMMM dd, yyyy"
              //         className="form-control"
              //         popperClassName="datepicker-popper"
              //       />
              //     </div>

              //     <h4 className="my-4">Order Items:</h4>

              //     <hr />

              //     <div className="cart-item my-1">
              //       {orderItems &&
              //         orderItems.map((item) => (
              //           <div key={item.product} className="row my-5">
              //             <div className="col-4 col-lg-2">
              //               <img
              //                 src={item.image}
              //                 alt={item.productName}
              //                 height="45"
              //                 width="65"
              //               />
              //             </div>

              //             <div className="col-5 col-lg-5">
              //               <Link to={`/products/${item.product}`}>
              //                 {item.productName}
              //               </Link>
              //             </div>

              //             <div className="col-4 col-lg-2 mt-4 mt-lg-0">
              //               <p>${item.price}</p>
              //             </div>

              //             <div className="col-4 col-lg-3 mt-4 mt-lg-0">
              //               <p>{item.quantity} Piece(s)</p>
              //             </div>
              //           </div>
              //         ))}
              //     </div>

              //     <hr />
              //   </div>

              //   <div className="col-12 col-lg-3 mt-5">
              //     <h4 className="my-4">Status</h4>

              //     <div className="form-group">
              //       <select
              //         className="form-control"
              //         name="status"
              //         value={status}
              //         onChange={(e) => setStatus(e.target.value)}
              //       >
              //         <option value="Processing">Pending</option>
              //         <option value="Approved">Approved</option>
              //         <option value="Received">Received</option>
              //       </select>
              //     </div>

              //     <button
              //       className="btn btn-primary btn-block"
              //       onClick={() => updateOrderHandler(order._id)}
              //       disabled={loadingUpdate}
              //     >
              //       {loadingUpdate ? 'Updating...' : 'Update Status'}
              //     </button>
              //   </div>
              // </div>
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: "100vh" }}
              >
                <div className="col-12 col-lg-8 order-details">
                  {/* <h2 className="my-5">Request  {request._id}</h2> */}

                  <div className="row">
                    <div className="col-md-6">
                      <p className="my-4 track-number">
                        Order Number:{" "}
                        <span className="underline">
                          BLA-
                          {order && order._id ? order._id.substring(0, 6) : ""}
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
                          <option value="Processing">Pending</option>
                          <option value="Approved">Approved</option>
                          <option value="Received">Received</option>
                        </select>
                      </div>

                      <button
                        className="btn btn-primary btn-block"
                        onClick={() => updateOrderHandler(order._id)}
                        disabled={loadingUpdate}
                      >
                        {loadingUpdate ? "Updating..." : "Update Status"}
                      </button>
                    </div>
                  </div>

                  <hr />

                  <h4 style={{ textAlign: "center" }}> Student Information</h4>
                  <div className="row">
                    <div className="col-md-6">
                      <p className="my-4 student-name">
                        Order by:{" "}
                        {user
                          ? `${user.firstname} ${user.lastname}`
                          : "Unknown"}
                      </p>
                    </div>
                    <div className="col-md-6">
                      <p className="my-4 student-name">
                        Grade & Section: {order.user?.grade || "N/A"}
                      </p>
                    </div>
                  </div>
                  <hr />

                  <h4 style={{ textAlign: "center" }}>Order Information</h4>
                  <div className="row">
                    <div className="col-md-6">
                      <p className="my-4 student-name">
                        Order Status:{" "}
                        <span>
                          <b
                            className={
                              orderStatus &&
                                String(orderStatus).includes("Received")
                                ? "greenColor"
                                : "redColor"
                            }
                          >
                            {orderStatus}
                          </b>
                        </span>
                      </p>
                    </div>

                    <div className="col-md-6">
                      <p className="my-4 student-name">
                        Payment Info: {order.paymentInfo?.type || "N/A"}{" "}
                      </p>
                    </div>
                    <div className="col-md-6">
                      <div className="my-4 students-name">
                        {orderItems &&
                          orderItems.map((item) => (
                            <div key={item.product}>
                              <p>{item.productName}</p>
                            </div>
                          ))}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="my-4 student-name">
                        {orderItems &&
                          orderItems.map((item) => (
                            <div
                              key={item.product}
                              className="my-4 student-namee"
                            >
                              <p>Price: ₱{item.price}</p>
                            </div>
                          ))}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <p className="my-4 student-name">
                        Total Amount to Pay: <span>₱{totalPrice}</span>
                      </p>
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


                  {/* <h4 style={{ textAlign: "center" }}>Product Information</h4>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="my-4 students-name">
                        {orderItems &&
                          orderItems.map((item) => (
                            <div key={item.product}>
                              <p>{item.productName}</p>
                            </div>
                          ))}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="my-4 student-name">
                        {orderItems &&
                          orderItems.map((item) => (
                            <div
                              key={item.product}
                              className="my-4 student-namee"
                            >
                              <p>Price: â‚±{item.price}</p>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div> */}

                  <hr />
                </div>
              </div>
            )}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default ProcessOrder;