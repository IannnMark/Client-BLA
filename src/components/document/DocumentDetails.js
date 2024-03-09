import React, { Fragment, useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { addDocumentRequest } from "../../actions/requestActions";
import { getDocumentDetails } from "../../actions/documentActions";

const DocumentDetails = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const { document, error } = useSelector((state) => state.documentDetails);
    const [quantity, setQuantity] = useState(1);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchDocumentDetails = async () => {
            try {
                dispatch({ type: "DOCUMENT_DETAILS_REQUEST" });

                const response = await dispatch(getDocumentDetails(id));
                const data = response?.payload?.data;

                if (data) {
                    const documentData = data.document || {};
                    dispatch({
                        type: "DOCUMENT_DETAILS_SUCCESS",
                        payload: documentData,
                    });
                } else {
                    dispatch({
                        type: "DOCUMENT_DETAILS_FAIL",
                        payload: "Invalid data structure in the response",
                    });
                }

                setLoading(false);
            } catch (error) {
                dispatch({
                    type: "DOCUMENT_DETAILS_FAIL",
                    payload: error.response?.data?.message || "Error fetching document details",
                });

                setLoading(false);
            }
        };

        fetchDocumentDetails();
    }, [dispatch, id]);



    const increaseQty = () => {
        setQuantity((prevQty) => prevQty + 1);
    };

    const decreaseQty = () => {
        setQuantity((prevQty) => (prevQty > 1 ? prevQty - 1 : 1));
    };

    const addRequest = () => {
        dispatch(addDocumentRequest(document._id, quantity));
    };

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title={document.name} />
                    <div className="row d-flex justify-content-around">
                        <div className="col-12 col-lg-5 img-fluid" id="document_image">
                            <Carousel pause="hover">
                                {document.image &&
                                    document.image.map((image) => (
                                        <Carousel.Item key={image.public_id}>
                                            <img
                                                className="d-block w-100"
                                                src={image.url}
                                                alt={document.name}
                                                style={{ maxWidth: '100%', maxHeight: '175px' }}
                                            />
                                        </Carousel.Item>
                                    ))}
                            </Carousel>
                        </div>


                        <div className="col-12 col-lg-5 mt-5">
                            <h3>{document.name}</h3>
                            <hr />

                            <p id="document_price">${document.price}</p>

                            <hr />

                            <div className="stockCounter d-inline">
                                <span className="btn btn-danger minus" onClick={decreaseQty}>
                                    -
                                </span>

                                <input
                                    type="number"
                                    className="form-control count d-inline"
                                    value={quantity}
                                    readOnly
                                />

                                <span className="btn btn-primary plus" onClick={increaseQty}>
                                    +
                                </span>
                            </div>

                            {user ? (
                                <button
                                    type="button"
                                    id="cart_btn"
                                    className="btn btn-primary d-inline ml-4"
                                    disabled={document.stock === 0}
                                    onClick={addRequest}
                                >
                                    Add Request
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    id="cart_btn"
                                    className="btn btn-primary d-inline ml-4"
                                    disabled
                                >
                                    Add Request
                                </button>
                            )}

                            <hr />
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default DocumentDetails;
