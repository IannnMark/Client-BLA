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
  const { error, checkoutUrl } = useSelector((state) => state.newOrder); // Assuming you're getting the checkoutUrl from the backend

  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [checkoutReady, setCheckoutReady] = useState(false);

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const order = {
    orderItems: cartItems,
    paymentMeth: paymentMethod,
    itemsPrice: orderInfo ? orderInfo.itemsPrice : 0,
    shippingPrice: orderInfo ? orderInfo.shippingPrice : 0,
    totalPrice: orderInfo ? orderInfo.totalPrice : 0
  };

  const errMsg = (message = "") =>
    toast.error(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  const submitHandler = async (e) => {
    e.preventDefault();
    document.querySelector("#pay_btn").disabled = true;

    order.paymentInfo = {
      type: paymentMethod,
    };

    dispatch(createOrder(order));
    dispatch(clearCart());

    if (paymentMethod === "Cash") {
      navigate("/success");
    } else {
      setCheckoutReady(true); // Signal that checkout is ready
    }
  };

  useEffect(() => {
    if (checkoutUrl && checkoutReady) {
      const newWindow = window.open(checkoutUrl);
      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        console.error('Pop-up was blocked. Please allow pop-ups from this site to proceed.');
      } else {
        console.log("Opening checkout URL:", checkoutUrl);
        navigate("/success");
      }
    }
  }, [checkoutUrl, checkoutReady, navigate]);

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
                  value="Gcash"
                  checked={paymentMethod === "Gcash"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label htmlFor="gcash" className="ml-2">
                  Gcash
                </label>
              </div>
            </div>
            <button id="pay_btn" type="submit" className="btn btn-block py-3">
              ORDER {` - ₱${order.totalPrice}`}
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Payment;
