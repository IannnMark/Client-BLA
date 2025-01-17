import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { newDocument, clearErrors } from "../../actions/documentActions";
import { NEW_DOCUMENT_RESET } from "../../constants/documentConstants";
import { Link } from "react-router-dom";

const NewDocument = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState(null); // Change from array to single image

    const [imagePreview, setImagePreview] = useState(null); // Rename from imagesPreview to imagePreview

    const dispatch = useDispatch();
    let navigate = useNavigate();

    const { loading, error, success } = useSelector((state) => state.newDocument);

    const message = (message = "") =>
        toast.success(message, {
            position: toast.POSITION.BOTTOM_CENTER,
        });

    useEffect(() => {
        if (error) {
            dispatch(clearErrors());
        }

        if (success) {
            navigate("/admin/documents");

            message("Document was successfully created");

            dispatch({ type: NEW_DOCUMENT_RESET });
        }
    }, [dispatch, error, success, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.set("name", name);
        formData.set("price", price);

        // Change to append single image
        if (image) {
            formData.append("image", image);
        }

        dispatch(newDocument(formData));
    };

    const onChange = (e) => {
        const file = e.target.files[0]; // Change to single file
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setImage(reader.result);
                setImagePreview(reader.result);
            }
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    return (
        <Fragment>
            <MetaData title={"New Document"} />
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
                                <h1 className="mb-4">New Document</h1>

                                <div className="form-group">
                                    <label htmlFor="name_field">Name</label>
                                    <input
                                        type="text"
                                        id="name_field"
                                        className="form-control"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
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
                                    <label>Image</label>
                                    <div className="custom-file">
                                        <input
                                            type="file"
                                            name="image"
                                            className="custom-file-input"
                                            id="customFile"
                                            onChange={onChange}
                                        />
                                        <label className="custom-file-label" htmlFor="customFile">
                                            Choose Image
                                        </label>
                                    </div>

                                    {imagePreview && (
                                        <img
                                            src={imagePreview}
                                            alt="Image Preview"
                                            className="mt-3 mr-2"
                                            width={55}
                                            height={52}
                                        />
                                    )}
                                </div>

                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <Link to="/admin/documents" className="btn btn-block py-2">
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

export default NewDocument;

