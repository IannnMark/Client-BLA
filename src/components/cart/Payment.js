import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";

import { useDispatch, useSelector } from "react-redux";
import { createOrder, clearErrors } from "../../actions/orderActions";
import { toast } from "react-toastify";
import { clearCart } from "../../actions/cartActions";

const Payment = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const { error } = useSelector((state) => state.newOrder);

  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [referenceNum, setReferenceNum] = useState("");
  const [referenceNumError, setReferenceNumError] = useState("");
  const [screenShot, setScreenShot] = useState([]);
  const [screenShotPreview, setScreenShotPreview] = useState([]);

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  const order = {
    orderItems: cartItems,
    paymentMeth: paymentMethod,
    reference_num: referenceNum,
    screenShot: screenShot,
  };

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  if (orderInfo) {
    order.itemsPrice = orderInfo.itemsPrice;
    order.shippingPrice = orderInfo.shippingPrice;
    order.totalPrice = orderInfo.totalPrice;
  }

  const validateReferenceNum = () => {
    if (paymentMethod === "GCash" && referenceNum.length !== 13) {
      setReferenceNumError("Reference # must be exactly 13 numbers");
      return false;
    } else {
      setReferenceNumError("");
      return true;
    }
  };

  const handleScreenshotChange = (e) => {
    const files = Array.from(e.target.files);

    setScreenShotPreview([]);
    setScreenShot([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setScreenShotPreview((oldArray) => [...oldArray, reader.result]);
          setScreenShot((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const errMsg = (message = "") =>
    toast.error(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  const submitHandler = async (e) => {
    e.preventDefault();
    document.querySelector("#pay_btn").disabled = true;

    if (!validateReferenceNum()) {
      return;
    }

    if (paymentMethod === "GCash" && screenShot.length === 0) {
      errMsg("Screenshot is required for GCash payment");
      return;
    }

    // Assuming your paymentInfo should be an object with a type property
    order.paymentInfo = {
      type: paymentMethod, // Set payment method here
    };

    order.referenceNumber = referenceNum;

    dispatch(createOrder(order));
    dispatch(clearCart());
    navigate("/success");
  };

  return (
    <Fragment>
      <MetaData title={"Payment"} />
      <CheckoutSteps shipping confirmOrder payment />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <div className="mb-3">
              <label className="form-label">Select Payment Method:</label>
              <div>
                <input
                  type="radio"
                  id="cash"
                  name="paymentMethod"
                  value="Cash"
                  checked={paymentMethod === "Cash"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label htmlFor="cash" className="ml-2 mr-4">
                  Cash
                </label>
                <input
                  type="radio"
                  id="gcash"
                  name="paymentMethod"
                  value="GCash"
                  checked={paymentMethod === "GCash"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label htmlFor="gcash" className="ml-2">
                  GCash
                </label>
              </div>
              {paymentMethod === "GCash" && (
                <Fragment>
                  <div style={{ textAlign: "center" }}>
                    <img
                      src="/images/gcashQr.jpg"
                      alt="GCash QR Code"
                      style={{
                        width: "50%",
                        height: "auto",
                        marginBottom: "10px",
                        display: "block",
                        marginLeft: "auto",
                        marginRight: "auto",
                      }}
                    />
                  </div>
                  <label className="form-label mt-3">Upload Screenshot:</label>
                  <div className="custom-file">
                    <input
                      type="file"
                      name="screenshot"
                      className="custom-file-input"
                      id="customFile"
                      onChange={handleScreenshotChange}
                      multiple
                    />
                    <label className="custom-file-label" htmlFor="customFile">
                      Upload
                    </label>
                  </div>
                  {screenShotPreview.map((img) => (
                    <img
                      src={img}
                      key={img}
                      alt="Screenshot Preview"
                      className="mt-3 mr-2"
                      width="55"
                      height="52"
                    />
                  ))}
                </Fragment>
              )}

              {paymentMethod === "GCash" && referenceNumError && (
                <div className="invalid-feedback">{referenceNumError}</div>
              )}
            </div>

            {paymentMethod === "GCash" && (
              <div className="mb-3">
                <label htmlFor="referenceNum" className="form-label">
                  Reference #:
                </label>
                <input
                  type="text"
                  id="referenceNum"
                  className={`form-control ${referenceNumError ? "is-invalid" : ""
                    }`}
                  value={referenceNum}
                  onChange={(e) => setReferenceNum(e.target.value)}
                  onBlur={validateReferenceNum}
                  pattern="[0-9]{13}"
                  title="Reference # must be exactly 13 numeric numbers"
                />

                {referenceNumError && (
                  <div className="invalid-feedback">{referenceNumError}</div>
                )}
              </div>
            )}
            <button id="pay_btn" type="submit" className="btn btn-block py-3">
              ORDER {` - ₱${orderInfo && orderInfo.totalPrice}`}
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Payment;






