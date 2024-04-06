import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { newProduct, clearErrors } from "../../actions/productActions";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";
import "./NewProduct.css";
import { Link } from "react-router-dom";

const NewProduct = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState(""); // Change to ObjectId type
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.newProduct);

  const message = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }

    if (success) {
      navigate("/admin/products");
      message("Product created successfully");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, error, success, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    // Validate that the category is selected
    if (!category) {
      // Display an error message or handle the case where category is not selected
      return;
    }

    const formData = new FormData();
    formData.set("productName", productName);
    formData.set("price", price);
    formData.set("category", category); // Set the category directly
    formData.set("stock", stock);

    images.forEach((image) => {
      formData.append("images", image);
    });

    dispatch(newProduct(formData));
  };


  const onChange = (e) => {
    const files = Array.from(e.target.files);
    setImagesPreview([]);
    setImages([]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <MetaData title={"New Product"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-8">
          <Fragment>
            <div className="wrapper my-5">
              <form
                style={{ backgroundColor: "#f0dc9c" }}
                className="shadow-lg"
                onSubmit={submitHandler}
                encType="multipart/form-data"
              >
                <h1 className="mb-4">New Product</h1>
                <div className="form-group">
                  <label htmlFor="name_field">Product Name</label>
                  <input
                    type="text"
                    id="name_field"
                    className="form-control"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="price_field">Price</label>
                  <input
                    type="text"
                    id="price_field"
                    className="form-control"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="category_field">Category</label>
                  <select
                    className="form-control"
                    id="category_field"
                    value={category} // Make sure to set category as the _id of the selected category
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Select Category</option>
                    <option value="60f4ad422a6c9b0015ebf1a6">Jogging Pants</option>
                    <option value="60f4ad422a6c9b0015ebf1a7">PE</option>
                    <option value="60f4ad422a6c9b0015ebf1a8">Grade 7 Books</option>
                    <option value="60f4ad422a6c9b0015ebf1a9">Grade 8 Books</option>
                    <option value="60f4ad422a6c9b0015ebf1a1">Grade 9 Books</option>
                    <option value="60f4ad422a6c9b0015ebf1a2">Grade 10 Books</option>
                    <option value="60f4ad422a6c9b0015ebf1a3">SHS Books</option>
                    <option value="60f4ad422a6c9b0015ebf1a4">Lanyard</option>
                    "Lanyard",
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="stock_field">Stock</label>
                  <input
                    type="number"
                    id="stock_field"
                    className="form-control"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Images</label>
                  <div className="custom-file">
                    <input
                      type="file"
                      name="images"
                      className="custom-file-input"
                      id="customFile"
                      onChange={onChange}
                      multiple
                    />
                    <label className="custom-file-label" htmlFor="customFile">
                      Choose Images
                    </label>
                  </div>
                  {imagesPreview.map((img) => (
                    <img
                      src={img}
                      key={img}
                      alt="Images Preview"
                      className="mt-3 mr-2"
                      width="55"
                      height="52"
                    />
                  ))}
                </div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <Link to="/admin/products" className="btn btn-block py-2">
                    Back
                  </Link>
                  <button
                    id="login_button"
                    type="submit"
                    className="btn btn-block py-2"
                    disabled={loading ? true : false}
                    style={{ marginLeft: "10px" }}
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default NewProduct;
