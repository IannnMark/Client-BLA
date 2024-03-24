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

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  const order = {
    orderItems: cartItems,
    paymentMeth: paymentMethod,
  };

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  if (orderInfo) {
    order.itemsPrice = orderInfo.itemsPrice;
    order.shippingPrice = orderInfo.shippingPrice;
    order.totalPrice = orderInfo.totalPrice;
  }

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

    // Redirect to success page if payment method is "Cash"
    if (paymentMethod === "Cash") {
      navigate("/success");
    } else {
      // Attempt to open the checkout URL in a new window
      const newWindow = window.open(checkoutUrl);
      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        // Pop-up was blocked
        // Provide feedback to the user
        console.error('Pop-up was blocked. Please allow pop-ups from this site to proceed.');
        // You can also redirect the user to an error page or display a message
      } else {
        // Pop-up was successfully opened
        console.log("Opening checkout URL:", checkoutUrl);
        navigate("/success");
      }
    }
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
              ORDER {` - ₱${orderInfo && orderInfo.totalPrice}`}

            </button>

          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Payment;
