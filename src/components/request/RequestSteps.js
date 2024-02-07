import React from "react";

import { Link } from "react-router-dom";

const RequestSteps = ({
    confirmRequest,
    payment
}) => {
    return (
        <div className="checkout-progress d-flex justify-content-center mt-5">
            {confirmRequest ? (
                <Link to="/request/confirm" className="float-right">
                    <div className="triangle2-active"></div>

                    <div className="step active-step">Confirm Request</div>

                    <div className="triangle-active"></div>
                </Link>
            ) : (
                <Link to="#!" disabled>
                    <div className="triangle2-incomplete"></div>

                    <div className="step incomplete">Confirm Request</div>

                    <div className="triangle-incomplete"></div>
                </Link>
            )}

            {payment ? (
                <Link to="/payments" className="float-right">
                    <div className="triangle2-active"></div>

                    <div className="step active-step">Payment</div>

                    <div className="triangle-active"></div>
                </Link>
            ) : (
                <Link to="#!" disabled>
                    <div className="triangle2-incomplete"></div>

                    <div className="step incomplete">Payment</div>

                    <div className="triangle-incomplete"></div>
                </Link>
            )}
        </div>
    );
};

export default RequestSteps;