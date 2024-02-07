import React, { Fragment } from "react";
import ErrorBoundary from './ErrorBoundary';
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { addDocumentRequest, removeDocumentRequest } from "../../actions/requestActions";

const DocumentRequest = () => {
    // const dispatch = useDispatch();
    // const { request } = useSelector((state) => state);
    // const { requestDocuments } = request;

    const dispatch = useDispatch();
    const { requestDocuments } = useSelector((state) => state.request);

    // const removeDocumentHandler = (id) => {
    //     dispatch(removeDocumentRequest(id));
    // };

    const removeDocumentHandler = (id) => {
        console.log('Removing document with id:', id);
        dispatch(removeDocumentRequest(id));
    };

    const navigate = useNavigate();

    const checkoutHandler = () => {
        navigate("/confirm-request");
    };


    return (
        <ErrorBoundary>
            <Fragment>
                <MetaData title={"Your Request"} />

                {requestDocuments.length === 0 ? (
                    <h2 className="mt-5">No Documents Requested</h2>
                ) : (
                    <Fragment>
                        <h2 className="mt-5">
                            Requested Documents: <b>{requestDocuments.length} items</b>
                        </h2>

                        <div className="row d-flex justify-content-between">
                            <div className="col-12 col-lg-8">
                                {requestDocuments.map((document) => (
                                    <Fragment key={document.document}>
                                        <hr />

                                        <div className="document-item">
                                            <div className="row">
                                                <div className="col-4 col-lg-3">
                                                    <img
                                                        src={document.image}
                                                        alt={document.name}
                                                        height="90"
                                                        width="115"
                                                    />
                                                </div>

                                                <div className="col-5 col-lg-3">
                                                    {/* <Link> */}
                                                    {document.name}
                                                    {/* </Link> */}
                                                </div>

                                                <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                    <p>Price: ${document.price}</p>
                                                </div>

                                                <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                                                    <div className="actionButtons">
                                                        <i
                                                            className="fa fa-trash btn btn-danger"
                                                            onClick={() => removeDocumentHandler(document.document)}
                                                        >
                                                        </i>
                                                    </div>
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
                                        Requested Documents:{" "}
                                        <span className="order-summary-values">
                                            {requestDocuments.reduce((acc, item) => acc + item.quantity, 0)} (Items)
                                        </span>
                                    </p>
                                    <p>
                                        Est. total:{" "}
                                        <span className="order-summary-values">
                                            $
                                            {requestDocuments
                                                .reduce((acc, item) => acc + item.quantity * item.price, 0)
                                                .toFixed(2)}
                                        </span>
                                    </p>
                                    <hr />
                                    <button
                                        id="checkout_btn"
                                        className="btn btn-primary btn-block"
                                        onClick={checkoutHandler}
                                    >
                                        Check out
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Fragment>
                )}
            </Fragment>
        </ErrorBoundary>
    );
};

export default DocumentRequest;

