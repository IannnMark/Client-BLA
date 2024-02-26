import React, { Fragment, useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import { useDispatch } from "react-redux";
import { getDocumentDetails } from "../../actions/documentActions";
import { addItemToCart } from "../../actions/cartActions";

const DocumentDetails = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [document, setDocument] = useState({});
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchDocumentDetails = async () => {
            try {
                const { data } = await dispatch(getDocumentDetails(id));
                console.log(data); // Check console log for data structure
                setDocument(data.document); // Assuming the document object is nested under 'document' property
                setLoading(false);
            } catch (error) {
                console.error("Error fetching document details:", error);
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

    const addToCart = () => {
        dispatch(addItemToCart(id, quantity));
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
                                {document.images &&
                                    document.images.map((image) => (
                                        <Carousel.Item key={image.public_id}>
                                            <img
                                                className="d-block w-100"
                                                src={image.url}
                                                alt={document.name}
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

                            <button
                                type="button"
                                id="cart_btn"
                                className="btn btn-primary d-inline ml-4"
                                disabled={document.stock === 0}
                                onClick={addToCart}
                            >
                                Add to Cart
                            </button>

                            <hr />

                            <h4 className="mt-2">Description:</h4>
                            <p>{document.description}</p>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default DocumentDetails;