import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import RequestSteps from "./RequestSteps";
import { useSelector } from "react-redux";
import "./request.css";

const ConfirmRequest = () => {
    const { requestDocuments } = useSelector((state) => state.request);

    const backToCartHandler = () => {
        navigate("/request");
    };


    let navigate = useNavigate();

    const itemsPrice = requestDocuments.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    const totalPrice = (itemsPrice).toFixed(2);

    const processToPayment = () => {
        const data = {
            itemsPrice: itemsPrice.toFixed(2),
            totalPrice,
        };

        sessionStorage.setItem("requestInfo", JSON.stringify(data));

        // Check if there is a redirect parameter in the URL
        const queryParams = new URLSearchParams(window.location.search);
        const redirectParam = queryParams.get("redirect");

        if (redirectParam === "confirm-request") {
            // Redirect to the ConfirmRequest page
            navigate("/confirm-request");
        } else {
            // Default redirect to the payments page
            navigate("/payments");
        }
    };

    return (
        <Fragment>
            <MetaData title={"Confirm Request"} />

            <RequestSteps confirmRequest />
            <div className="row d-flex justify-content-between">
                <div className="col-12 col-lg-8 mt-5 order-confirm">
                    <h4 className="mt-4" style={{ fontFamily: 'Arial', fontWeight: 'bold', fontSize: '18px', color: 'black' }}>Your Cart Items:</h4>

                    {requestDocuments.map((document) => (
                        <Fragment key={document.document}>
                            <hr style={{ borderTop: '5px solid gray', width: '100%', fontWeight: 'bold' }} />
                            <div className="cart-item my-1">
                                <div className="row">
                                    <div className="col-4 col-lg-2">
                                        <img src={document.image} alt="document" height="45" width="65" />
                                    </div>

                                    <div className="col-5 col-lg-6">
                                        <Link to={`/document/${document.document}`}>{document.name}</Link>
                                    </div>

                                    <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                                        <p>
                                            {document.quantity} x {document.price} ={" "}
                                            <b>{(document.quantity * document.price).toFixed(2)}</b>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <hr style={{ borderTop: '5px solid gray', width: '100%', fontWeight: 'bold' }} />
                        </Fragment>
                    ))}
                </div>

                <div className="col-12 col-lg-3 my-4" style={{ position: 'relative', left: '-20px' }}>
                    <div id="order_summary">
                        <h4>Request Summary</h4>

                        <hr style={{ borderTop: '5px solid gray', width: '100%', fontWeight: 'bold' }} />

                        <p>
                            Subtotal:{" "}
                            <span className="order-summary-values">â‚± {itemsPrice}</span>
                        </p>

                        <hr style={{ borderTop: '5px solid gray', width: '100%', fontWeight: 'bold' }} />

                        <p>
                            Total: <span className="order-summary-values">â‚± {totalPrice}</span>
                        </p>

                        <hr />

                        <button
                            id="checkout_btn"
                            className="btn btn-primary btn-block"
                            onClick={processToPayment}
                        >
                            Proceed to Payment
                        </button>
                        <button
                            id="adddocu_btn"
                            className="btn btn-primary btn-block"
                            onClick={backToCartHandler}
                        >
                            Back to Cart
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
            <br></br>
        </Fragment>
    );
}

export default ConfirmRequest;