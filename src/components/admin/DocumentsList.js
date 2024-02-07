import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";

import {
    getAdminDocuments,
    deleteDocument,
    clearErrors,
} from "../../actions/documentActions"

import { DELETE_DOCUMENT_RESET } from "../../constants/documentConstants";

const DocumentList = () => {
    const dispatch = useDispatch();

    let navigate = useNavigate();

    const { loading, error, documents } = useSelector((state) => state.documents);

    const { error: deleteError, isDeleted
    } = useSelector(
        (state) => state.document
    );

    useEffect(() => {
        dispatch(getAdminDocuments());

        if (error) {
            dispatch(clearErrors());
        }

        if (deleteError) {
            dispatch(clearErrors());
        }

        if (isDeleted) {
            navigate("/admin/documents");

            dispatch({ type: DELETE_DOCUMENT_RESET });
        }
    }, [dispatch, error, deleteError, isDeleted, navigate]);

    const setDocuments = () => {
        const data = {
            columns: [
                {
                    label: "ID",

                    field: "id",

                    sort: "asc",
                },

                {
                    label: "Name",

                    field: "name",

                    sort: "asc",
                },

                {
                    label: "Price",

                    field: "price",

                    sort: "asc",
                },

                {
                    label: "Images",

                    field: "images",

                    sort: "asc",

                },

                {
                    label: "Actions",

                    field: "actions",
                },
            ],

            rows: [],
        };


        documents.forEach((document) => {
            data.rows.push({
                id: document._id,

                name: document.name,

                price: `₱${document.price}`,

                images: (
                    <img
                        src={document.images[0].url}
                        alt="document.name"
                        className="document-image"
                        style={{ width: "80px", height: "80px" }}
                    />
                ),

                actions: (
                    <Fragment>
                        <Link
                            to={`/admin/document/${document._id}`}
                            className="btn btn-primary py-1 px-2"
                        >
                            <i className="fa fa-pencil"></i>
                        </Link>
                        <button
                            className="btn btn-danger py-1 px-2 ml-2"
                            onClick={() => deleteDocumentHandler(document._id)}
                        >
                            <i className="fa fa-trash"></i>
                        </button>
                    </Fragment>
                ),
            });
        });

        return data;
    };

    const deleteDocumentHandler = (id) => {
        dispatch(deleteDocument(id));
    };

    return (
        <Fragment>
            <MetaData title={"All Documents"} />

            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">All Documents</h1>

                        {loading ? (
                            <Loader />
                        ) : (
                            <MDBDataTable
                                data={setDocuments()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        )}
                    </Fragment>
                </div>
            </div>
        </Fragment>
    );
};

export default DocumentList;