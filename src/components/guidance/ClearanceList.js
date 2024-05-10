import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getGuidanceClearance, clearErrors, deleteClearance } from "../../actions/clearanceActions";
import { DELETE_CLEARANCE_RESET } from "../../constants/clearanceConstants";

const ClearanceList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, clearances } = useSelector((state) => state.clearances);
    const { error: deleteError, isDeleted } = useSelector((state) => state.clearance || {});

    useEffect(() => {
        dispatch(getGuidanceClearance());

        if (error) {
            dispatch(clearErrors());
        }

        if (deleteError) {
            dispatch(clearErrors());
        }

        if (isDeleted) {
            navigate("/guidance/clearance");
            dispatch({ type: DELETE_CLEARANCE_RESET });
        }
    }, [dispatch, error, deleteError, isDeleted, navigate]);

    const setClearances = () => {
        const data = {
            columns: [
                { label: "User Last Name", field: "userLastName", sort: "asc" },
                { label: "Grade", field: "grade", sort: "asc" },
                { label: "Clearance Images", field: "clearanceImages", sort: "asc" },
                { label: "Uploaded At", field: "uploadedAt", sort: "asc" },
                { label: "Actions", field: "actions" },
            ],
            rows: [],
        };
        if (clearances && clearances.length > 0) {
            clearances.forEach((clearance) => {
                data.rows.push({
                    userLastName: clearance.user.lastname,
                    grade: clearance.user.grade,
                    clearanceImages: (
                        clearance.clearanceImages && clearance.clearanceImages.length > 0 ? (
                            <a href={clearance.clearanceImages[0].url} target="_blank" rel="noopener noreferrer">
                                <img
                                    src={clearance.clearanceImages[0].url}
                                    alt={clearance.clearanceImages}
                                    className="clearance-image"
                                    style={{ width: "80px", height: "80px" }}
                                />
                            </a>
                        ) : (
                            "N/A"
                        )
                    ),
                    uploadedAt: clearance.uploadedAt
                        ? new Date(clearance.uploadedAt).toLocaleDateString()
                        : "N/A",
                    actions: (
                        <Fragment>
                            {/* <Link to={`/guidance/clearance/${clearance._id}`} className="btn btn-primary py-1 px-2">
                                <i className="fa fa-eye"></i>
                            </Link> */}
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
                <div className="col-12 col-md-1">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">All Clearances</h1>

                        {loading ? (
                            <Loader />
                        ) : (
                            <MDBDataTable data={
                                setClearances()}
                                className="px-4"
                                bordered
                                striped
                                classNamee="px-3 custom-mdb-datatable" // Add custom class here
                                borderedd
                                stripedd
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
                                tbodyBorderTop />
                        )}
                    </Fragment>
                </div>
            </div>
        </Fragment>
    );
};

export default ClearanceList;