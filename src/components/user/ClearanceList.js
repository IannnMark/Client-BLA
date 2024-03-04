import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
    getClearance,
    clearErrors,
    deleteClearance,
} from "../../actions/clearanceActions";
import { DELETE_CLEARANCE_RESET } from "../../constants/clearanceConstants";
import "./Clearance.css";


const ClearanceList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, clearances } = useSelector(
        (state) => state.clearances
    );
    const { error: deleteError, isDeleted } = useSelector(
        (state) => state.clearance || {}
    );

    useEffect(() => {
        dispatch(getClearance());

        if (error) {
            dispatch(clearErrors());
        }

        if (deleteError) {
            dispatch(clearErrors());
        }

        if (isDeleted) {
            navigate("/clearance");
            dispatch({ type: DELETE_CLEARANCE_RESET });
        }
    }, [dispatch, error, deleteError, isDeleted, navigate]);

    const setClearances = () => {
        const data = {
            columns: [
                { label: "User Last Name", field: "userLastName", sort: "asc" },
                { label: "Clearance Images", field: "clearanceImages", sort: "asc" },
                { label: "Uploaded Date", field: "uploadedAt", sort: "asc" },
                { label: "Actions", field: "actions" },
            ],
            rows: [],
        };
        if (clearances && clearances.length > 0) {
            clearances.forEach((clearance) => {
                data.rows.push({
                    userLastName: clearance.user.lastname,
                    clearanceImages:
                        clearance.clearanceImages &&
                            clearance.clearanceImages.length > 0 ? (
                            <a
                                href={clearance.clearanceImages[0].url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    src={clearance.clearanceImages[0].url}
                                    alt={clearance.clearanceImages}
                                    className="clearance-image"
                                    style={{ width: "80px", height: "80px" }}
                                />
                            </a>
                        ) : (
                            "N/A"
                        ),
                    uploadedAt: clearance.uploadedAt
                        ? new Date(clearance.uploadedAt).toLocaleDateString()
                        : "N/A",
                    actions: (
                        <Fragment>
                            <button
                                className="btn btn-danger py-1 px-2 ml-2"
                                onClick={() => deleteClearanceHandler(clearance._id)}
                            >
                                <i className="fa fa-trash"></i>
                            </button>
                        </Fragment>
                    ),
                });
            });
        }

        return data;
    };

    const deleteClearanceHandler = (id) => {
        dispatch(deleteClearance(id));
    };

    return (
        <Fragment>
            <MetaData title={"All Clearances"} />

            <div className="row">
                <div className="col-md-11 mx-auto text-center">
                    <Fragment>
                        <h1 className="my-55">All Clearances</h1>

                        <div className="d-flex justify-content-center">
                            <Link to="/clearance/new" className="btn btn-warning" style={{ marginTop: "20px" }}>
                                <i className="fa-regular fa-file" style={{ marginRight: "5px" }}></i> Upload Clearance
                            </Link>
                        </div>

                        {loading ? (

                            <Loader />

                        ) : (
                            <MDBDataTable

                                data={setClearances()}
                                className="px-3"
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
                                    fontSize: "18px",
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

export default ClearanceList;
