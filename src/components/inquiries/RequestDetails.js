import React, { Fragment, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getRequestDetails, clearErrors } from "../../actions/inquiriesActions";
import "./LR.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const RequestDetails = () => {
  const dispatch = useDispatch();
  const {
    loading,
    error,
    request = {},
  } = useSelector((state) => state.requestDetails);

  const { requestItems, requestStatus } = request;

  const calculateTotal = () => {
    let total = 0;
    if (requestItems) {
      requestItems.forEach((item) => {
        total += item.price;
      });
    }
    return total.toFixed(2);
  };

  let { id } = useParams();

  useEffect(() => {
    dispatch(getRequestDetails(id));

    if (error) {
      dispatch(clearErrors());
    }
  }, [dispatch, error, id]);

  console.log(request);

  const contentArea = useRef(null);

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
      pdf.save("document_receipt.pdf");
    });
  };

  return (
    <Fragment>
      <MetaData title={"Request Details"} />

      {loading ? (
        <Loader />
      ) : (
        <Fragment>

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
                      {request && request._id
                        ? request._id.substring(0, 6)
                        : ""}
                    </span>
                  </p>

                  <div className="date-request-container">
                    <p className="date-request">
                      Date of Request:{" "}
                      <span className="request-left">
                        {new Date(request.dateofRequest).toLocaleDateString()}
                      </span>
                    </p>

                    <p className="date-request">
                      Payor:{" "}
                      <span className="request-right">
                        {request.user?.firstname || "N/A"} <b></b>
                        {request.user?.lastname || "N/A"}
                      </span>
                    </p>

                    <p className="date-request">
                      Purpose:{" "}
                      <span className="request-left">{request.purpose}</span>
                    </p>

                    <p className="date-request">
                      Payment Info:{" "}
                      <span className="request-right">
                        {request.paymentInfo || "N/A"}{" "}
                        {/* Optional chaining */}
                      </span>
                    </p>
                  </div>

                  {/* <h4 className="my-4">Full Name:</h4> */}

                  {/* <div className="container">
                  <div className="full-name">
                    <h4 className="centered-text">Full Name:</h4>
                    <p>
                      <b>{request.user?.firstname || "N/A"} </b>
                      <b>{request.user?.lastname || "N/A"}</b>
                    </p>
                  </div>
                </div>

                <div className="container">
                  <div className="full-name">
                    <h4 className="centered-text">Grade Level:</h4>
                    <p>
                      <b>{request.user?.grade || "N/A"} </b>
                    </p>
                  </div>
                </div> */}

                  {/* <h4 className="my-4">Payment Info:</h4>

                {request.paymentInfo ? (
                  <div>
                    <p>
                      <b>Type:</b> {request.paymentInfo.type || "N/A"}
                    </p>
                  </div>
                ) : (
                  <p>
                    <b>N/A</b>
                  </p>
                )}

                {request.purpose ? (
                  <div>
                    <h4 className="my-4">Purpose:</h4>
                    <p>{request.purpose}</p>
                  </div>
                ) : (
                  <p>
                    <b>Purpose:</b> N/A
                  </p>
                )} */}

                  <hr />

                  <div className="date-request-container">
                    <p className="my-4 date-requestt">
                      Document <span className="requestt">Price</span>
                    </p>
                    <p className="my-4 date-requesttt">
                      {requestItems &&
                        requestItems.map((item) => (
                          <div
                            key={item.document}
                            className="date-requesttt-item"
                          >
                            <span className="document-name">{item.name}</span>
                            <span className="price">₱{item.price}</span>
                          </div>
                        ))}
                    </p>
                  </div>

                  {/* <h4 className="my-4">Request Status:</h4> */}

                  {/* <p
                  className={
                    request.requestStatus &&
                    String(request.requestStatus).includes("Received")
                      ? "greenColor"
                      : "redColor"
                  }
                >
                  <b>{requestStatus}</b>
                </p> */}

                  {/* <h4 className="my-4">Request Items:</h4> */}

                  <hr />

                  {/* <div className="cart-item my-1">
                  {requestItems &&
                    requestItems.map((item) => (
                      <div key={item.document} className="row m-5">
                        <div className="col-5 col-lg-5">
                          <Link to={`/documents/${item.document}`}>
                            {item.name}
                          </Link>
                        </div>

                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                          <p>₱{item.price}</p>
                        </div>
                      </div>
                    ))}
                </div> */}
                  <div className="total-amount">
                    {/* <p>
                    <b>Total Amount:</b> &#8369;
                    {Number(calculateTotal()).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
                  </p> */}

                    <p className="date-request">
                      <b>Total Amount:</b>
                      <span className="request-right">
                        ₱
                        {Number(calculateTotal()).toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                        })}
                      </span>
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
                  <i className="fa fa-phone" aria-hidden="true"></i>{" "}
                  + 0912 047 6948
                </div>


              </div>
              <hr />
              <br></br>

              <div className="container">
                <button className="download-button" onClick={generatePDF}>Download Receipt</button>
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
    </Fragment>
  );
};

export default RequestDetails;
