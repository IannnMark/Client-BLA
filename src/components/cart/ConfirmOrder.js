import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector } from "react-redux";

const ConfirmOrder = () => {
  const { cartItems } = useSelector((state) => state.cart);

  let navigate = useNavigate();


  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const totalPrice = (itemsPrice).toFixed(2);

  const processToPayment = () => {
    const data = {
      itemsPrice: itemsPrice.toFixed(2),


      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    navigate("/payment");
  };

  return (
    <Fragment>
      <MetaData title={"Confirm Order"} />

      <CheckoutSteps shipping confirmOrder />

      <div className="row d-flex justify-content-between">
        <div className="col-12 col-lg-8 mt-5 order-confirm">

          <hr />

          <h4 className="mt-4">Your Cart Items:</h4>

          {cartItems.map((item) => (
            <Fragment key={item.product}>
              <hr />
              <div className="cart-item my-1">
                <div className="row">
                  <div className="col-4 col-lg-2">
                    <img src={item.image} alt="Laptop" height="45" width="65" />
                  </div>

                  <div className="col-5 col-lg-6">
                    <Link to={`/product/${item.product}`}>{item.productName}</Link>
                  </div>

                  <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                    <p>
                      {item.quantity} x ₱{item.price} ={" "}
                      <b>₱{(item.quantity * item.price).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}</b>
                    </p>
                  </div>
                </div>
              </div>

              <hr />
            </Fragment>
          ))}
        </div>

        <div className="col-12 col-lg-3 my-4">
          <div id="order_summary">
            <h4>Order Summary</h4>

            <hr />

            <p>
              Subtotal:{" "}
              <span className="order-summary-values">₱{itemsPrice.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}</span>
            </p>

            <hr />

            <p>
              Total: <span className="order-summary-values">₱{(parseFloat(totalPrice) || 0).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              </span>
            </p>

            <hr />

            <button
              id="checkout_btn"
              className="btn btn-primary btn-block"
              onClick={processToPayment}
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;