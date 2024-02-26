import React, { Fragment, useEffect } from "react";

import { Link, useParams } from "react-router-dom";

import MetaData from "../layout/MetaData";

import Loader from "../layout/Loader";

import "./order.css";

import { useDispatch, useSelector } from "react-redux";

import { getOrderDetails, clearErrors } from "../../actions/orderActions";

const OrderDetails = () => {
  //   const alert = useAlert();

  const dispatch = useDispatch();

  const { loading, error, order = {} } = useSelector(
    (state) => state.orderDetails
  );

  const {
    orderItems,
    orderStatus,
  } = order;

  let { id } = useParams();

  useEffect(() => {
    dispatch(getOrderDetails(id));

    if (error) {
      //   alert.error(error);

      dispatch(clearErrors());
    }
  }, [dispatch, error, id]);

  return (
    <Fragment>
      <MetaData title={"Order Details"} />

      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8 mt-5 order-details">
              <h1 className="my-4">Order Number: {order._id}</h1>

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
                          alt={item.name}
                          height="45"
                          width="65"
                        />
                      </div>

                      <div className="col-5 col-lg-5">
                        <Link to={`/products/${item.product}`}>
                          {item.name}
                        </Link>
                      </div>

                      <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p>${item.price}</p>
                      </div>

                      <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                        <p>{item.quantity} Piece(s)</p>
                      </div>
                    </div>
                  ))}
              </div>

              <hr />
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
