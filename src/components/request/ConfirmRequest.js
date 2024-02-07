import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import RequestSteps from "./RequestSteps";
import { useSelector } from "react-redux";

const ConfirmRequest = () => {
    const { requestDocuments } = useSelector((state) => state.request);

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
                    <h4 className="mt-4">Your Cart Items:</h4>

                    {requestDocuments.map((document) => (
                        <Fragment key={document.document}>
                            <hr />
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
                                            {document.quantity} x ${document.price} ={" "}
                                            <b>${(document.quantity * document.price).toFixed(2)}</b>
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
                        <h4>Request Summary</h4>

                        <hr />

                        <p>
                            Subtotal:{" "}
                            <span className="order-summary-values">${itemsPrice}</span>
                        </p>

                        <hr />

                        <p>
                            Total: <span className="order-summary-values">${totalPrice}</span>
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
}

export default ConfirmRequest;
