import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
    allCashierRequests,
    clearErrors,
} from "../../actions/inquiriesActions";
import { DELETE_REQUEST_RESET } from "../../constants/inquiriesConstants";

const RequestsList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, requests } = useSelector((state) => state.allRequests);
    const { isDeleted } = useSelector((state) => state.request);

    useEffect(() => {
        dispatch(allCashierRequests());

        if (error) {
            toast.error(error, { position: toast.POSITION.BOTTOM_CENTER });
            dispatch(clearErrors());
        }

        if (isDeleted) {
            toast.success("Request deleted successfully", {
                position: toast.POSITION.BOTTOM_CENTER,
            });
            navigate("/cashier/requests");
            dispatch({ type: DELETE_REQUEST_RESET });
        }
    }, [dispatch, error, navigate, isDeleted]);


    const setRequests = () => {
        const sortedRequests = [...requests].sort(
            (a, b) => new Date(b.dateofRequest) - new Date(a.dateofRequest)
        );

        sortedRequests.reverse();

        const data = {
            columns: [
                {
                    label: "No.",
                    field: "index",
                }, // New column
                {
                    label: "User Last Name",
                    field: "userLastName",
                    sort: "asc",
                },
                {
                    label: "Grade",
                    field: "grade",
                    sort: "asc",
                },
                {
                    label: "No. of Requests",
                    field: "numofRequests",
                    sort: "asc",
                },
                {
                    label: "Amount",
                    field: "amount",
                    sort: "asc",
                },
                {
                    label: "Requested Documents",
                    field: "requestedDocuments",
                    sort: "asc",
                },

                {
                    label: "Date of Request",
                    field: "dateofRequest",
                    sort: "asc",
                },

                {
                    label: "Date Release",
                    field: "dateRelease",
                    sort: "asc",
                },
                {
                    label: "Status",
                    field: "status",
                    sort: "asc",
                },
                {
                    label: "Actions",
                    field: "actions",
                },

            ],
            rows: [],
        };

        sortedRequests.forEach((request, index) => { // Add index to the map function
            const formattedCreatedDate = request.dateofRequest
                ? new Date(request.dateofRequest).toLocaleDateString()
                : "N/A";

            const formattedReleaseDate = request.dateRelease
                ? new Date(request.dateRelease).toLocaleDateString()
                : "N/A";

            const requestedDocuments =
                request.requestItems &&
                request.requestItems.length > 0 &&
                request.requestItems.map((item) => item.name).join(", ");

            data.rows.push({
                id: request._id,
                userLastName: request.user?.lastname,
                grade: request.user?.grade,
                numofRequests: request.requestItems.length,
                amount: `₱${request.totalPrice}`,
                requestedDocuments: requestedDocuments || "N/A",
                dateofRequest: formattedCreatedDate,
                dateRelease: formattedReleaseDate,
                status: request.requestStatus ? (
                    <p
                        style={{
                            color: request.requestStatus.includes("Received") ? "green" : "red",
                        }}
                    >
                        {request.requestStatus}
                    </p>
                ) : null,
                actions: (
                    <Fragment>
                        <Link to={`/cashier/request/${request._id}`} className="btn btn-primary py-1 px-2">
                            <i className="fa fa-eye"></i>
                        </Link>
                    </Fragment>
                ),
                index: index + 1, // New field to hold the sequential number
            });
        });

        return data;
    };

    return (
        <Fragment>
            <MetaData title={"All Requests"} />

            <div className="row">
                <div className="col-12 col-md-1">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">All Requests</h1>

                        {loading ? (
                            <Loader />
                        ) : (
                            <MDBDataTable data={setRequests()} className="px-3" bordered
                                striped
                                classNamee="px-3 custom-mdb-datatable" // Add custom class here
                                hover
                                noBottomColumns
                                responsive
                                searching={true} // Enable searching
                                searchLabel="Search..." // Customize search input placeholder
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

export default RequestsList;
