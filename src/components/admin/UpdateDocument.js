import React, { Fragment, useState, useEffect } from "react";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    updateDocument,
    getDocumentDetails,
    clearErrors,
} from "../../actions/documentActions";
import { UPDATE_DOCUMENT_RESET } from "../../constants/documentConstants";

const UpdateDocument = () => {
    const [codename, setCodename] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const dispatch = useDispatch();
    const { error, document } = useSelector((state) => state.documentDetails);
    const { loading, error: updateError, isUpdated } = useSelector(
        (state) => state.document
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
        console.log('Document ID:', id);

        if (document && document._id !== id) {
            dispatch(getDocumentDetails(id));
        } else {
            setCodename(document.codename);
            setName(document.name);
            setPrice(document.price);
            setOldImages(document.images);
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
            navigate("/admin/documents");
            successMsg("Document updated successfully");
            dispatch({ type: UPDATE_DOCUMENT_RESET });
        }
    }, [dispatch, error, isUpdated, navigate, updateError, document, id]);

    const submitHandler = (e) => {
        e.preventDefault();

        // Check if document and id are available
        if (!document || !id) {
            console.error('Document or ID is undefined');
            return;
        }

        const formData = new FormData();
        formData.set("codename", codename);
        formData.set("name", name);
        formData.set("price", price);

        image.forEach((img) => {
            formData.append("image", img);
        });

        dispatch(updateDocument(document._id, formData));
    };

    const onChange = (e) => {
        const files = Array.from(e.target.files);

        setImagesPreview([]);
        setImage([]);
        setOldImages([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((oldArray) => [...oldArray, reader.result]);
                    setImage((oldArray) => [...oldArray, reader.result]);
                }
            };

            reader.readAsDataURL(file);
        });
    };

    return (
        <Fragment>
            <MetaData title={"Update Document"} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form
                                className="shadow-lg"
                                onSubmit={submitHandler}
                                encType="multipart/form-data"
                            >
                                <h1 className="mb-4">Update Document</h1>

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

                                    {oldImages &&
                                        oldImages.map((img) => (
                                            <img
                                                key={img.url}
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
                                            alt="Image Preview"
                                            className="mt-3 mr-2"
                                            width="55"
                                            height="52"
                                        />
                                    ))}
                                </div>

                                <button
                                    id="login_button"
                                    type="submit"
                                    className="btn btn-block py-3"
                                    disabled={loading ? true : false}
                                >
                                    UPDATE
                                </button>
                            </form>
                        </div>
                    </Fragment>
                </div>
            </div>
        </Fragment>
    );
};

export default UpdateDocument;
