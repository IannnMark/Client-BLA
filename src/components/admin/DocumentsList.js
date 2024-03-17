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
                    label: "Codename",
                    field: "codename",
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
                    label: "Image",

                    field: "image",

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
                codename: document.codename,

                name: document.name,

                price: `₱${document.price}`,

                image: (
                    <a href={document.image[0].url} target="_blank" rel="noopener noreferrer">
                        <img
                            src={document.image[0].url}
                            alt="document.name"
                            className="document-image"
                            style={{ width: "80px", height: "80px" }}
                        />
                    </a>
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
        <Fragment style={{ backgroundColor: "lightgray" }}>
            <MetaData title={"All Documents"} />

            <div className="row">
                <div className="col-10 col-md-1">
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
                                striped
                                hover
                                noBottomColumns
                                responsive
                                searching={false}
                                entriesLabel="Show entries"
                                entriesOptions={[10, 20, 30]}
                                infoLabel={["Showing", "to", "of", "entries"]}
                                paginationLabel={["Previous", "Next"]}
                                responsiveSm
                                responsiveMd
                                responsiveLg
                                responsiveXl
                                noRecordsFoundLabel="No records found"
                                paginationRowsPerPageOptions={[10, 20, 30]}
                                pagingTop
                                pagingBottom
                                paginationLabels={["Previous", "Next"]}
                                style={{
                                    fontSize: "16px",
                                    fontFamily:
                                        "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif",
                                }}
                                // Add custom styling for cells based on request status
                                tbodyTextBlack
                                tbodyBorderY
                                tbodyBorderX
                                tbodyBorderBottom
                                tbodyBorderTop
                            />
                        )}
                    </Fragment>
                </div>
            </div>
        </Fragment>
    );
};

export default DocumentList;
