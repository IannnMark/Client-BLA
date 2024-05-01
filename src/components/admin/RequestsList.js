import React, { Fragment, useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
    allRequests,
    clearErrors,
    deleteRequest,
} from "../../actions/inquiriesActions";
import { DELETE_REQUEST_RESET } from "../../constants/inquiriesConstants";
import "./RequestList.css";

import { PDFExport, savePDF } from "@progress/kendo-react-pdf";

const RequestsList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, requests } = useSelector(
        (state) => state.allRequests
    );
    const { isDeleted } = useSelector((state) => state.request);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState("");
    const [selectedDocument, setSelectedDocument] = useState("");
    const [selectedGrade, setSelectedGrade] = useState("");
    const [showDateFilter, setShowDateFilter] = useState(false);
    const [showDocumentFilter, setShowDocumentFilter] = useState(false);
    const [showStatusFilter, setShowStatusFilter] = useState(false);
    const [showGradeFilter, setShowGradeFilter] = useState(false);


    const pdfExportComponent = useRef(null);
    const contentArea = useRef(null);

    const handleExportWithComponent = () => {
        pdfExportComponent.current.save();
    };

    const handleExportWithMethod = () => {
        savePDF(contentArea.current, { paperSize: "A4" });
    };



    useEffect(() => {
        dispatch(allRequests());

        if (error) {
            toast.error(error, { position: toast.POSITION.BOTTOM_CENTER });
            dispatch(clearErrors());
        }

        if (isDeleted) {
            toast.success("Request deleted successfully", {
                position: toast.POSITION.BOTTOM_CENTER,
            });
            navigate("/admin/requests");
            dispatch({ type: DELETE_REQUEST_RESET });
        }
    }, [dispatch, error, navigate, isDeleted]);

    const deleteRequestHandler = async (id) => {
        try {
            await dispatch(deleteRequest(id));

            const updatedRequests = requests.filter((request) => request._id !== id);

            toast.success("Request deleted successfully", {
                position: toast.POSITION.BOTTOM_CENTER,
            });
        } catch (error) {
            toast.error(error.message, {
                position: toast.POSITION.BOTTOM_CENTER,
            });
        }
    };

    const getUniqueDocuments = () => {
        const uniqueDocuments = new Set();

        requests.forEach((request) => {
            if (request.requestItems) {
                request.requestItems.forEach((item) => {
                    uniqueDocuments.add(item.name);
                });
            }
        });

        return Array.from(uniqueDocuments);
    };

    const getUniqueGrades = () => {
        const uniqueGrades = new Set();

        requests.forEach((request) => {
            if (request.user && request.user.grade) {
                uniqueGrades.add(request.user.grade);
            }
        });

        return Array.from(uniqueGrades);
    };

    const setRequests = () => {
        const filteredRequests = requests.filter((request) => {
            const requestDate = new Date(request.dateofRequest);
            return (
                (!startDate || requestDate >= startDate) &&
                (!endDate || requestDate <= endDate)
            );
        });

        const statusFilteredRequests = selectedStatus
            ? filteredRequests.filter(
                (request) =>
                    request.requestStatus &&
                    String(request.requestStatus).includes(selectedStatus)
            )
            : filteredRequests;

        const documentFilteredRequests = selectedDocument
            ? statusFilteredRequests.filter((request) =>
                request.requestItems.some((item) => item.name === selectedDocument)
            )
            : statusFilteredRequests;

        const gradeFilteredRequests = selectedGrade
            ? documentFilteredRequests.filter((request) =>
                request.user && request.user.grade === selectedGrade
            )
            : documentFilteredRequests;

        const sortedFilteredRequests = [...gradeFilteredRequests].sort(
            (a, b) => new Date(a.dateofRequest) - new Date(b.dateofRequest)
        );

        const data = {
            columns: [
                // {
                //     label: "Tracking   ID",
                //     field: "id",
                //     sort: "asc",
                // },
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
                    label: "No of Requests",
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
                    label: "Release of Request",
                    field: "dateRelease",
                    sort: "asc",
                },
                {
                    label: "Authorization Letter",
                    field: "authorizationLetter",
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

        sortedFilteredRequests.forEach((request) => {
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
                // id: request._id,
                userLastName: request.user ? request.user.lastname : "N/A",
                grade: parseInt(request.user ? request.user.grade : 0, 10),
                numofRequests: request.requestItems.length,
                amount: `₱${request.totalPrice}`,
                requestedDocuments: requestedDocuments || "N/A",
                dateofRequest: formattedCreatedDate,
                dateRelease: formattedReleaseDate,
                authorizationLetter: request.authorizationLetter &&
                    request.authorizationLetter.length > 0 && (
                        <a
                            href={request.authorizationLetter[0].url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                src={request.authorizationLetter[0].url}
                                alt={request.requestItems}
                                className="authorization-image"
                                style={{ width: "80px", height: "80px" }}
                            />
                        </a>
                    ),
                status: request.requestStatus ? (
                    <p
                        style={{
                            color: request.requestStatus.includes("Received")
                                ? "green"
                                : "red",
                        }}
                    >
                        {request.requestStatus}
                    </p>
                ) : null,
                actions: (
                    <Fragment >
                        <Link
                            to={`/admin/request/${request._id}`}
                            className="btn btn-primary py-1 px-2"
                            style={{ marginLeft: "7.5px", marginBottom: "5px" }}
                        >
                            <i className="fa fa-eye"></i>
                        </Link>
                        <button
                            className="btn btn-danger py-1 px-2"
                            onClick={() => deleteRequestHandler(request._id)}
                            style={{ marginLeft: "9.5px" }}
                        >
                            <i className="fa fa-trash-o"></i>
                        </button>
                    </Fragment>
                ),
            });
        });

        return data;
    };

    return (
        <Fragment style={{ backgroundColor: "lightgray" }}>
            <MetaData title={"All Requests"} />

            <div className="row">
                <div className="col-10 col-md-1 ">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">All Requests</h1>

                        <div className="row my-4">
                            <div className="col-md-3">
                                <button
                                    className="toggle-button date-filter"
                                    onClick={() => setShowDateFilter(!showDateFilter)}
                                >
                                    Filtered by Date
                                </button>
                                <br />
                                <br />
                                {showDateFilter && (
                                    <div className="date-input-section" style={{ marginLeft: '30px', fontWeight: "bold" }}>
                                        <div>
                                            <label style={{ marginRight: "5px" }}>Start Date: </label>
                                            <input
                                                style={{ fontWeight: "bold" }}
                                                type="date"
                                                onChange={(e) => setStartDate(new Date(e.target.value))}
                                            />
                                        </div>
                                        <div className="mt-3">
                                            <label style={{ marginRight: "10px" }}>End Date: </label>
                                            <input
                                                style={{ fontWeight: "bold" }}
                                                type="date"
                                                onChange={(e) => setEndDate(new Date(e.target.value))}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="col-md-3">
                                <button
                                    className="toggle-button document-filter"
                                    onClick={() => setShowDocumentFilter(!showDocumentFilter)}
                                >
                                    Filtered by Documents
                                </button>
                                <br />
                                <br />
                                {showDocumentFilter && (
                                    <div className="document-input-section" style={{ marginLeft: '60px', fontWeight: "bold" }}>
                                        <label style={{ marginRight: "10px" }}>Document: </label>
                                        <select
                                            style={{ fontWeight: "bold" }}
                                            onChange={(e) => setSelectedDocument(e.target.value)}
                                            value={selectedDocument}
                                        >
                                            <option value="">All</option>
                                            {getUniqueDocuments().map((document, index) => (
                                                <option key={index} value={document}>
                                                    {document}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                            </div>

                            <div className="col-md-3">
                                <button
                                    className="toggle-button status-filter"
                                    onClick={() => setShowStatusFilter(!showStatusFilter)}
                                >
                                    Filtered by Status
                                </button>
                                <br />
                                <br />
                                {showStatusFilter && (
                                    <div className="status-input-section" style={{ marginLeft: '40px', fontWeight: "bold" }}>
                                        <label style={{ marginRight: "5px" }}>Status: </label>
                                        <select
                                            style={{ fontWeight: "bold" }}
                                            onChange={(e) => setSelectedStatus(e.target.value)}
                                            value={selectedStatus}
                                        >
                                            <option value="">All</option>
                                            <option value="Pending">Pending</option>
                                            <option value="Approved">Approved</option>
                                            <option value="Received">Received</option>
                                            <option value="Pending Violation">
                                                Pending Violation
                                            </option>
                                            <option value="Pending Balance">Pending Balance</option>
                                        </select>
                                    </div>
                                )}
                            </div>

                            <div className="col-md-3">
                                <button
                                    className="toggle-button grade-filter"
                                    onClick={() => setShowGradeFilter(!showGradeFilter)}
                                >
                                    Filtered by Grade
                                </button>
                                <br />
                                <br />
                                {showGradeFilter && (
                                    <div className="grade-input-section" style={{ marginLeft: '50px', fontWeight: "bold" }}>
                                        <label style={{ marginRight: "5px" }}>Grade: </label>
                                        <select
                                            style={{ fontWeight: "bold" }}
                                            value={selectedGrade}
                                            onChange={(e) => setSelectedGrade(e.target.value)}
                                        >
                                            <option value="">All</option>
                                            {getUniqueGrades().map((grade, index) => (
                                                <option key={index} value={grade}>
                                                    {grade}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                            </div>

                        </div>

                        <button onClick={handleExportWithMethod}>Download Reports</button>
                        <PDFExport ref={pdfExportComponent}>
                            <div ref={contentArea}>
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

                            </div>
                        </PDFExport>
                    </Fragment>
                </div>
            </div>
        </Fragment>
    );
};

export default RequestsList;