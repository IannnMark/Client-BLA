import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addDocumentRequest } from '../../actions/requestActions';

const Document = ({ document }) => {
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        // Load the cart items from local storage if available
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || {};
        console.log('Loaded Cart Items:', cartItems);

        const storedQuantity = cartItems[document._id] || 1;
        setQuantity(storedQuantity);
    }, [document._id]);

    const increaseQty = () => {
        setQuantity((prevQty) => prevQty + 1);
    };

    const decreaseQty = () => {
        setQuantity((prevQty) => (prevQty > 1 ? prevQty - 1 : 1));
    };


    const addRequest = () => {
        dispatch(addDocumentRequest(document._id, quantity));

        // Update the request documents in local storage
        const requestDocuments = JSON.parse(localStorage.getItem('requestDocuments')) || {};
        const updatedQuantity = parseInt(quantity, 10);

        // Debugging: Log the request documents to check if they are correctly stored in local storage
        console.log('Current request documents:', requestDocuments);

        requestDocuments[document._id] = updatedQuantity;
        localStorage.setItem('requestDocuments', JSON.stringify(requestDocuments));
    };


    return (
        <div className="col-sm-12 col-md-6 col-lg-3 my-3">
            <div className="card p-3 rounded">
                <img
                    className="card-img-top mx-auto"
                    src={document.images[0].url}
                    alt={document.name}
                />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">
                        <Link to={`document/${document._id}`}>{document.name}</Link>
                    </h5>
                    <p className="card-text">₱{document.price}</p>


                    {user ? (
                        <button
                            type="button"
                            id="cart_btn"
                            className="btn btn-primary d-inline ml-4"
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
                </div>
            </div>
        </div>
    );
};

export default Document;
