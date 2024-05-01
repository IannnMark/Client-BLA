import React, { Fragment } from "react";
import ErrorBoundary from "./ErrorBoundary";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { removeDocumentRequest } from "../../actions/requestActions";
import "./request.css";

const DocumentRequest = () => {
    const dispatch = useDispatch();
    const { requestDocuments } = useSelector((state) => state.request);

    const removeDocumentHandler = (id) => {
        console.log("Removing document with id:", id);
        dispatch(removeDocumentRequest(id));
    };

    const navigate = useNavigate();

    const checkoutHandler = () => {
        navigate("/confirm-request");
    };

    const addDocumentHandler = () => {
        navigate("/");
    };


    return (
        <ErrorBoundary>
            <Fragment>
                <MetaData title={"Your Request"} />

                {requestDocuments.length === 0 ? (
                    <h2 className="clas">
                        No Document Requested
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
                            Requested Documents:&nbsp;
                            <b>
                                {requestDocuments.length}&nbsp;
                                {requestDocuments.length === 1 ? "item" : "items"}
                            </b>
                        </h2>
                        <div className="row d-flex justify-content-between">
                            <div className="col-12 col-lg-8">
                                {requestDocuments.map((document) => (
                                    <Fragment key={document.document}>
                                        <hr style={{ borderTop: '5px solid gray', width: '100%', fontWeight: 'bold' }} />


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

                                                <div className="col-5 col-lg-3">{document.name}</div>

                                                <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                    <p>Price: ${document.price}</p>
                                                </div>

                                                <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                                                    <div className="actionButtons">
                                                        <i
                                                            className="fa fa-trash btn btn-danger"
                                                            onClick={() =>
                                                                removeDocumentHandler(document.document)
                                                            }
                                                        ></i>
                                                    </div>
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
                                        Requested Documents:{" "}
                                        <span className="order-summary-values">
                                            {requestDocuments.reduce(
                                                (acc, item) => acc + item.quantity,
                                                0
                                            )}{" "}
                                        </span>
                                    </p>
                                    <p>
                                        Est. total:{" "}
                                        <span className="order-summary-values">
                                            â‚±
                                            {requestDocuments
                                                .reduce(
                                                    (acc, item) => acc + item.quantity * item.price,
                                                    0
                                                )
                                                .toFixed(2)}
                                        </span>
                                    </p>
                                    <hr style={{ borderTop: '5px solid gray', width: '100%', fontWeight: 'bold' }} />
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
                                        onClick={addDocumentHandler}
                                    >
                                        Add Document
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
        </ErrorBoundary>
    );
};

export default DocumentRequest;