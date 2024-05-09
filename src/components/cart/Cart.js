import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, removeItemFromCart } from "../../actions/cartActions";
import "./cart.css";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const increaseQty = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (newQty > stock) return;
    dispatch(addItemToCart(id, newQty));
  };

  const decreaseQty = (id, quantity) => {
    const newQty = quantity - 1;
    if (newQty <= 0) return;
    dispatch(addItemToCart(id, newQty));
  };

  const removeCartItemHandler = (id) => {
    dispatch(removeItemFromCart(id));
  };
  const checkoutHandler = () => {
    navigate("/confirm");
  };

  const addDocumentHandler = () => {
    navigate("/");
  };

  const handleButtonClick = () => {
    // Redirect to the desired page
    navigate("/products");
  };

  const addProductHandler = () => {
    navigate("/products");
  };

  let navigate = useNavigate();

  return (
    <Fragment>
      <MetaData title={"Your Cart"} />

      {cartItems.length === 0 ? (
        <h2 className="cartt">
          Your Cart is Empty
          <button className="button-533" style={{}} onClick={handleButtonClick}>
            Buy Merch
          </button>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
        </h2>
      ) : (
        <Fragment>
          <h2 className="titlee">
            Merch List:&nbsp;
            <b>
              {cartItems.length}&nbsp;
              {cartItems.length === 1 ? "item" : "items"}
            </b>
          </h2>
          <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8">
              {cartItems.map((item) => (
                <Fragment key={item.product}>
                  <br></br>
                  <hr
                    style={{
                      borderTop: "5px solid gray",
                      width: "100%",
                      fontWeight: "bold",
                    }}
                  />

                  <div className="document-item">
                    <div className="row">
                      <div className="col-4 col-lg-3">
                        <img
                          src={item.image}
                          alt={item.productName}
                          height="90"
                          width="115"
                        />
                      </div>

                      <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                        <div className="stockCounter d-inline">
                          <span
                            className="btn btn-danger minus"
                            onClick={() =>
                              decreaseQty(item.product, item.quantity)
                            }
                          >
                            -
                          </span>

                          <input
                            type="number"
                            className="form-control count d-inline"
                            value={item.quantity}
                            readOnly
                          />

                          <span
                            className="btn btn-primary plus"
                            onClick={() =>
                              increaseQty(
                                item.product,
                                item.quantity,
                                item.stock
                              )
                            }
                          >
                            +
                          </span>
                        </div>
                      </div>

                      <div className="col-5 col-lg-3">
                        {item.product.productName}
                      </div>

                      <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p>Price: ₱{item.price.toFixed(2)}</p>
                      </div>

                      <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                        <div className="actionButtons">
                          <i
                            className="fa fa-trash btn btn-danger"
                            onClick={() => removeCartItemHandler(item.product)}
                          ></i>
                        </div>
                      </div>
                    </div>
                  </div>

                  <hr
                    style={{
                      borderTop: "5px solid gray",
                      width: "100%",
                      fontWeight: "bold",
                    }}
                  />
                </Fragment>
              ))}
            </div>

            <div
              className="col-12 col-lg-3 my-4"
              style={{ position: "relative", left: "-20px" }}
            >
              <div id="order_summary">
                <h4>Order Summary</h4>
                <hr
                  style={{
                    borderTop: "5px solid gray",
                    width: "100%",
                    fontWeight: "bold",
                  }}
                />
                <p>
                  Number of purchase:{" "}
                  <span className="order-summary-values">
                    {cartItems.reduce((acc, item) => acc + item.quantity, 0)}{" "}
                  </span>
                </p>
                <p>
                  Est. total:{" "}
                  {/* <span className="order-summary-values">
                        ₱
                        {cartItems
                            .reduce(
                            (acc, item) => acc + item.quantity * item.price,
                            0
                            )
                            .toFixed(2)}
                        </span> */}
                  <span className="order-summary-values">
                    ₱
                    {cartItems
                      .reduce(
                        (acc, item) => acc + item.quantity * item.price,
                        0
                      )
                      .toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                  </span>
                </p>
                <hr
                  style={{
                    borderTop: "5px solid gray",
                    width: "100%",
                    fontWeight: "bold",
                  }}
                />
                <button
                  id="checkout_btn"
                  className="btn btn-primary btn-block"
                  onClick={checkoutHandler}
                >
                  Check out
                </button>

                <button
                  id="adddocu_btn"
                  className="btn btn-primary btn-block"
                  onClick={addProductHandler}
                >
                  Add Merch
                </button>
              </div>
            </div>
          </div>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;