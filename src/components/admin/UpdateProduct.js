import React, { Fragment, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProduct,
  getProductDetails,
  clearErrors,
} from "../../actions/productActions";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";

const UpdateProduct = () => {
  const [codename, setCodename] = useState("");
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const categories = [
    { _id: "Uniform", name: "Uniform" },
    { _id: "PE", name: "PE" },
    { _id: "Grade 7 Books", name: "Grade 7 Books" },
    { _id: "Grade 8 Books", name: "Grade 8 Books" },
    { _id: "Grade 9 Books", name: "Grade 9 Books" },
    { _id: "Grade 10 Books", name: "Grade 10 Books" },
    { _id: "SHS Books", name: "SHS Books" },
    { _id: "Lanyard", name: "Lanyard" },
  ];
  const dispatch = useDispatch();

  const { error, product } = useSelector((state) => state.productDetails);

  const { loading, error: updateError, isUpdated } = useSelector(
    (state) => state.product
  );

  let { id } = useParams();
  let navigate = useNavigate();

  const errMsg = (message = "") =>
    toast.error(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  const successMsg = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  useEffect(() => {
    if (product && product._id !== id) {
      dispatch(getProductDetails(id));
    } else {
      setCodename(product.codename);
      setProductName(product.productName);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.stock);
      setOldImages(product.images);
    }

    if (error) {
      errMsg(error);

      dispatch(clearErrors());
    }

    if (updateError) {
      errMsg(updateError);

      dispatch(clearErrors());
    }

    if (isUpdated) {
      navigate("/admin/products");

      successMsg("Product updated successfully");

      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [dispatch, error, isUpdated, navigate, updateError, product, id]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("codename", codename);
    formData.set("productName", productName);
    formData.set("price", price);
    formData.set("category", category);
    formData.set("stock", stock);

    images.forEach((image) => {
      formData.append("images", image);
    });

    dispatch(updateProduct(product._id, formData));
  };

  const onChange = (e) => {
    const files = Array.from(e.target.files);

    setImagesPreview([]);
    setImages([]);
    setOldImages([]);

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
      <div className="row">
        <div className="col-12 col-md-2">
          {/* Include Sidebar component */}
        </div>
        <div className="col-12 col-md-8">
          <div className="wrapper my-5">
            <form
              style={{ backgroundColor: "#f0dc9c" }}
              className="shadow-lg"
              onSubmit={submitHandler}
              encType="multipart/form-data"
            >
              <h1 className="mb-4">Update Product</h1>
              <div className="form-group">
                <label htmlFor="codename_field">Code Name</label>
                <input
                  type="text"
                  id="codename_field"
                  className="form-control"
                  value={codename}
                  onChange={(e) => setCodename(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="productName_field">Product Name</label>
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
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
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
                {oldImages &&
                  oldImages.map((img) => (
                    <img
                      key={img}
                      src={img.url}
                      alt={img.url}
                      className="mt-3 mr-2"
                      width="55"
                      height="52"
                    />
                  ))}
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
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProduct;
