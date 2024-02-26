import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import { useDispatch, useSelector } from "react-redux";
import { myRequests, clearErrors } from "../../actions/inquiriesActions";
import "./LR.css";


const ListRequest = () => {
    const dispatch = useDispatch();

    const { loading, error, requests } = useSelector((state) => state.myRequests);

    useEffect(() => {
        dispatch(myRequests());

        if (error) {
            dispatch(clearErrors());
        }
    }, [dispatch, error]);

    const setRequests = () => {
        const sortedRequests = [...requests].sort((a, b) => new Date(b.dateofRequest) - new Date(a.dateofRequest));
        const data = {
            columns: [
                // {
                //     label: "Request ID",
                //     field: "id",
                //     sort: "asc",
                // },
                {
                    label: "Requested Documents",
                    field: "requestedDocuments", // Add a new field for requested documents
                    sort: "asc",
                },
                {
                    label: "Number of Docs",
                    field: "numOfItems",
                    sort: "asc",
                    
                },
                {
                    label: "Amount",
                    field: "amount",
                    sort: "asc",
                },
                {
                    label: "Date of Request",

                    field: "dateofRequest",

                    sort: "asc",
                },
                {
                    label: "Release Date",
                    field: "releaseDate",
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
                    sort: "asc",
                },
            ],
            rows: [],
        };

        if (sortedRequests) {
            sortedRequests.forEach((request) => {
                const formattedCreatedDate = request.dateofRequest
                    ? new Date(request.dateofRequest).toLocaleDateString()
                    : "N/A";
                const formattedReleaseDate = request.dateRelease ? new Date(request.dateRelease).toLocaleDateString() : "N/A";
                const requestedDocuments =
                    request.requestItems &&
                    request.requestItems.length > 0 &&
                    request.requestItems.map((item) => item.name).join(", ");
                data.rows.push({
                    // id: request._id,
                    requestedDocuments: requestedDocuments || "N/A",
                    numOfItems: request.requestItems.length,
                    dateofRequest: formattedCreatedDate,
                    releaseDate: formattedReleaseDate,
                    amount: `$${request.totalPrice}`,
                    status:
                        request.requestStatus === "Received" ? (
                            <p style={{ color: "green" }}>{request.requestStatus}</p>
                        ) : (
                            <p style={{ color: "red" }}>{request.requestStatus}</p>
                        ),
                    actions: (
                        <Link to={`/request/${request._id}`} className="btn btn-primary">
                            <i className="fa fa-eye"></i>
                        </Link>
                    ),
                });
            });
        }

        return data;
    };

    return (
        <Fragment>
            <MetaData title={"My Requests"} />
            <h1 className="my-55">My Requests</h1>
            {loading ? (
                <Loader />
            ) : (
                <MDBDataTable
                data={setRequests()}
                className="px-3 custom-mdb-datatable" // Add custom class here
                bordered
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
                    fontFamily: "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif",
                }}
                // Add custom styling for cells based on request status
                tbodyTextBlack
                tbodyBorderY
                tbodyBorderX
                tbodyBorderBottom
                tbodyBorderTop
                />
            )}
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
        </Fragment>
      
    );
};

export default ListRequest;
