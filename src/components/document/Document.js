import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addDocumentRequest } from '../../actions/requestActions';

const Document = ({ document, backgroundImage }) => {
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || {};
        const storedQuantity = cartItems[document._id] || 1;
        setQuantity(storedQuantity);
    }, [document._id]);

    const addRequest = () => {
        dispatch(addDocumentRequest(document._id, quantity));

        const requestDocuments = JSON.parse(localStorage.getItem('requestDocuments')) || {};
        const updatedQuantity = parseInt(quantity, 10);

        requestDocuments[document._id] = updatedQuantity;
        localStorage.setItem('requestDocuments', JSON.stringify(requestDocuments));
    };

    return (
        <div className="col-sm-12 col-md-6 col-lg-3 my-3">
            <div className="card p-3 rounded" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/bglogin.jpg)`, backgroundSize: 'cover', padding: '20px' }}>
                <img
                    className="card-img-top mx-auto"
                    src={document.image[0].url}
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