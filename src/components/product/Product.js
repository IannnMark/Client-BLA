import React from 'react'
import { Link } from "react-router-dom";


const Product = ({ product }) => {
    return (

        <div className="col-sm-12 col-md-6 col-lg-3 my-3" >
            <div className="card p-3 rounded" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/bgproduct.svg)`, backgroundSize: 'cover', padding: '20px' }}>
                <img
                    className="card-img-top mx-auto"
                    src={product.images[0].url}
                />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">
                        <a href="">{product.productName}</a>
                    </h5>
                    <p className="card-text">₱{product.price}</p>
                    <Link to={`/product/${product._id}`} id="view_btn" className="btn btn-block">View Details</Link>
                </div>
            </div>
        </div>
    )
}
export default Product