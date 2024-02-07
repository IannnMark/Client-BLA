import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, clearErrors } from "../../actions/orderActions";
import { clearCart } from "../../actions/cartActions";

const Payment = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const { error } = useSelector((state) => state.newOrder);

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  const order = {
    orderItems: cartItems
  };

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  if (orderInfo) {
    order.itemsPrice = orderInfo.itemsPrice;
    order.totalPrice = orderInfo.totalPrice;
  }


  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [proofOfBilling, setProofOfBilling] = useState([]);

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    // Clear proof of billing when switching payment methods
    setProofOfBilling([]);
  };

  const handleProofOfBillingChange = (e) => {
    setProofOfBilling(Array.from(e.target.files));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const paymentInfo = paymentMethod === "gcash" ? "Gcash" : "Cash";
    order.paymentInfo = paymentInfo;

    order.paymentInfo = paymentInfo;

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
            <h1 className="mb-4">Payment Method</h1>

            <div className="form-group">
              <label>Select Payment Method:</label>
              <div className="d-flex justify-content-around">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymentMethod"
                    id="cashMethod"
                    value="cash"
                    checked={paymentMethod === "cash"}
                    onChange={() => handlePaymentMethodChange("cash")}
                  />
                  <label className="form-check-label" htmlFor="cashMethod">
                    Cash
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymentMethod"
                    id="gcashMethod"
                    value="gcash"
                    checked={paymentMethod === "gcash"}
                    onChange={() => handlePaymentMethodChange("gcash")}
                  />
                  <label className="form-check-label" htmlFor="gcashMethod">
                    Gcash
                  </label>
                </div>
              </div>
            </div>

            {paymentMethod === "gcash" && (
              <div className="form-group">
                <label htmlFor="proofOfBilling">Proof of Billing for Gcash:</label>
                <input
                  type="file"
                  id="proofOfBilling"
                  onChange={handleProofOfBillingChange}
                  accept="image/*"
                  multiple
                  className="form-control"
                />
              </div>
            )}

            <button type="submit" className="btn btn-block py-3">
              Pay - {orderInfo && orderInfo.totalPrice}
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Payment;
