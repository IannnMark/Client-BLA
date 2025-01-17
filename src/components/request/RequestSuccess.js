import React, { Fragment } from "react";

import { Link } from "react-router-dom";

import MetaData from "../layout/MetaData";

import "./request.css";

const RequestSuccess = () => {
    sessionStorage.clear();
    localStorage.clear();
    return (
        <Fragment>
            <MetaData title={"Request Success"} />

            <div className="row justify-content-center">
                <div className="col-6 mt-5 text-center">
                    <img
                        className="my-5 img-fluid d-block mx-auto"
                        src="/images/order_success.png"
                        alt="Request Success"
                        width="200"
                        height="200"
                    />
                    <div className="containerr">
                        <h2>Your Request has been placed successfully.</h2>
                    </div>

                    <Link to="/requests/me">Go to Requests</Link>
                </div>
            </div>
            <br></br>
            <br></br>
        </Fragment>
    );
};

export default RequestSuccess;
