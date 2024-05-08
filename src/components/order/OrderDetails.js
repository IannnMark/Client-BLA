import React, { Fragment, useEffect, useRef } from "react";

import { Link, useParams } from "react-router-dom";

import MetaData from "../layout/MetaData";

import Loader from "../layout/Loader";

import "./order.css";

import { useDispatch, useSelector } from "react-redux";

import { getOrderDetails, clearErrors } from "../../actions/orderActions";

import { PDFExport, savePDF } from "@progress/kendo-react-pdf";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const OrderDetails = () => {
  //   const alert = useAlert();

  const dispatch = useDispatch();

  const {
    loading,
    error,
    order = {},
  } = useSelector((state) => state.orderDetails);

  const { orderItems, orderStatus } = order;

  const calculateTotal = () => {
    let total = 0;
    if (orderItems) {
      orderItems.forEach((item) => {
        total += item.price * item.quantity;
      });
    }
    return total.toFixed(2);
  };

  let { id } = useParams();

  useEffect(() => {
    dispatch(getOrderDetails(id));

    if (error) {
      //   alert.error(error);

      dispatch(clearErrors());
    }
  }, [dispatch, error, id]);

  const pdfExportComponent = useRef(null);
  const contentArea = useRef(null);

  const handleExportWithComponent = (event) => {
    pdfExportComponent.current.save();
  };

  const handleExportWithMethod = (event) => {
    savePDF(contentArea.current, { paperSize: "A4" });
  };

  const generatePDF = () => {
    const content = contentArea.current;

    html2canvas(content).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgWidth = 208;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const padding = 20; // Padding in pixels
      pdf.addImage(
        imgData,
        "PNG",
        padding,
        padding,
        imgWidth - 2 * padding,
        imgHeight - 2 * padding
      );
      pdf.save("order_receipt.pdf");
    });
  };

  return (
    <Fragment>
      <MetaData title={"Order Details"} />

      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          {/* <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8 mt-5 order-details">
              <button onClick={handleExportWithMethod}>Download Receipt</button>

              <PDFExport ref={pdfExportComponent} paperSize={"A4"}>
                <div ref={contentArea}>

                  <div className="logo-container">
                    <img
                      src="/images/school_logo.png"
                      alt="Company Logo"
                      className="logo"
                      style={{ maxWidth: '120%', height: 'auto', maxHeight: '200px' }}
                    />
                  </div>
                  <h1 className="my-4">Order Number: {order._id}</h1>

                  <hr />

                  <h4 className="my-4">Full Name:</h4>

                  <p className={order.user?.lastname && String(order.user.lastname)}>
                    <b>{`${order.user?.firstname || "N/A"} ${order.user?.lastname || "N/A"}`}</b>
                  </p>

                  <hr />
                  <h4 className="my-4">Payment Info:</h4>

                  {order.paymentInfo ? (
                    <div>
                      <p>
                        <b>Type:</b> {order.paymentInfo.type || "N/A"}
                      </p>
                    </div>
                  ) : (
                    <p>
                      <b>N/A</b>
                    </p>
                  )}


                  <hr />

                  <h4 className="my-4">Order Status:</h4>

                  <p
                    className={
                      order.orderStatus &&
                        String(order.orderStatus).includes("Received")
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    <b>{orderStatus}</b>
                  </p>

                  <h4 className="my-4">Order Items:</h4>

                  <hr />

                  <div className="cart-item my-1">
                    {orderItems &&
                      orderItems.map((item) => (
                        <div key={item.product} className="row my-4">
                          <div className="col-4 col-lg-2">
                            <img
                              src={item.image}
                              alt={item.productName}
                              height="45"
                              width="65"
                            />
                          </div>

                          <div className="col-5 col-lg-5">
                            <Link to={`/products/${item.product}`}>
                              {item.productName}
                            </Link>
                          </div>

                          <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                            <p>₱{item.price}</p>
                          </div>

                          <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                            <p>{item.quantity} Piece(s)</p>
                          </div>
                        </div>
                      ))}
                  </div>
                  <hr />
                  <div className="text-center font-weight-bold">
                    <p>
                      <b>Total Amount:</b> ₱{calculateTotal()}
                    </p>
                  </div>
                </div>
              </PDFExport>

              <hr />
            </div>
          </div> */}

          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "100vh" }}
          >
            <div className="col-12 col-lg-8 mt-5 request-details">
              <div
                ref={contentArea}
                style={{ fontFamily: "Arial, sans-serif" }}
              >
                <div
                  ref={contentArea}
                  style={{ fontFamily: "Arial, sans-serif" }}
                >
                  <div className="logo-container">
                    <img
                      src="/images/school_logo.png"
                      alt="Company Logo"
                      className="logo"
                    />
                    <div className="address">
                      <p className="schoolname">
                        Blessed Land Academy of Taguig
                      </p>
                      <p className="addr">
                        Address: 11-3 Bautista, Lower Bicutan, Manila
                      </p>
                      <p className="addrr">1632 Metro Manila</p>
                    </div>
                  </div>
                  {/* <h1 className="my-4">Tracking Number: {request._id}</h1> */}

                  <hr />
                  <p className="my-4 tracking-number">
                    Tracking Number:{" "}
                    <span className="underline">
                      {" "}
                      BLA-
                      {order && order._id ? order._id.substring(0, 6) : ""}
                    </span>
                  </p>

                  <div className="date-request-container">
                    <p className="date-request">
                      Date of Order:{" "}
                      <span className="request-left">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </p>

                    <p className="date-request">
                      Payor:{" "}
                      <span className="request-right">
                        {order.user?.firstname || "N/A"} <b></b>
                        {order.user?.lastname || "N/A"}
                      </span>
                    </p>

                    <p className="date-request">
                      Payment Info:{" "}
                      <span className="request-right">
                        {order.paymentInfo || "N/A"}{" "}
                        {/* Optional chaining */}
                      </span>
                    </p>
                  </div>

                  <hr />

                  <div className="date-request-container">
                    <p className="my-4 date-requestt">
                      Document <span className="requestt">Total</span>
                    </p>
                    <p className="my-4 date-requesttt">
                      {orderItems &&
                        orderItems.map((item) => (
                          <div
                            key={item.product}
                            className="date-requesttt-item"
                          >
                            <span className="document-name">
                              {item.productName}
                            </span>
                            <span className="price">₱{item.price}</span>
                          </div>
                        ))}
                    </p>
                  </div>

                  <hr />

                  <div className="total-amount">
                    <p className="date-request">
                      <b>Total Amount:</b>
                      <span className="request-right">₱{calculateTotal()}</span>
                    </p>
                  </div>
                </div>
                <hr />

                <div style={{ textAlign: "center" }}>
                  <i className="fa fa-briefcase" aria-hidden="true"></i>{" "}
                  blessedlandacademy2005@yahoo.com
                </div>

                <br></br>
                <div style={{ textAlign: "center" }}>
                  <i className="fa fa-phone" aria-hidden="true"></i> + 0912 047
                  6948
                </div>
              </div>
              <hr />
              <br></br>

              <div className="container">
                <button className="download-button" onClick={generatePDF}>
                  Download Receipt
                </button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </Fragment>
  );
};

export default OrderDetails;