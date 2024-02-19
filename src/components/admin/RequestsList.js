import React, { Fragment, useEffect, useState } from "react";
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

const RequestsList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, requests } = useSelector((state) => state.allRequests);
    const { isDeleted } = useSelector((state) => state.request);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState("");
    const [selectedDocument, setSelectedDocument] = useState("");
    const [selectedGrade, setSelectedGrade] = useState("1");

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
            toast.error(error.message, { position: toast.POSITION.BOTTOM_CENTER });
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
            ? documentFilteredRequests.filter((request) => {
                const userGrade = parseInt(request.user.grade, 10);
                const selectedGradeNum = parseInt(selectedGrade, 10) || 0;

                console.log('Selected Grade:', selectedGradeNum, typeof selectedGradeNum);
                console.log('User Grade:', userGrade, typeof userGrade);

                const result = userGrade >= selectedGradeNum;
                console.log('Comparison Result:', result);

                return result;
            })
            : documentFilteredRequests;











        console.log('Filtered by Date:', filteredRequests);
        console.log('Filtered by Status:', statusFilteredRequests);
        console.log('Filtered by Documents:', documentFilteredRequests);
        console.log('Filtered by Grade:', gradeFilteredRequests);

        const sortedFilteredRequests = [...gradeFilteredRequests].sort(
            (a, b) => new Date(b.dateofRequest) - new Date(a.dateofRequest)
        );

        const data = {
            columns: [
                {
                    label: "Request ID",
                    field: "id",
                    sort: "asc",
                },
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
                id: request._id,
                userLastName: request.user.lastname,
                // grade: request.user.grade,
                grade: parseInt(request.user.grade, 10),
                numofRequests: request.requestItems.length,
                amount: `₱${request.totalPrice}`,
                requestedDocuments: requestedDocuments || "N/A",
                dateofRequest: formattedCreatedDate,
                dateRelease: formattedReleaseDate,
                authorizationLetter: (
                    request.authorizationLetter && request.authorizationLetter.length > 0 && (
                        <a href={request.authorizationLetter[0].url} target="_blank" rel="noopener noreferrer">
                            <img
                                src={request.authorizationLetter[0].url}
                                alt={request.requestItems}
                                className="authorization-image"
                                style={{ width: "80px", height: "80px" }}
                            />
                        </a>
                    )
                ),

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
                        <Link to={`/admin/request/${request._id}`} className="btn btn-primary py-1 px-2">
                            <i className="fa fa-eye"></i>
                        </Link>
                        <button
                            className="btn btn-danger py-1 px-2 ml-2"
                            onClick={() => deleteRequestHandler(request._id)}
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
        <Fragment>
            <MetaData title={"All Requests"} />

            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">All Requests</h1>

                        <div className="row my-4">
                            <div className="col-md-6">
                                <h4 className="my-5">Filtered by Date</h4>
                                <label>Start Date: </label>
                                <input
                                    type="date"
                                    onChange={(e) => setStartDate(new Date(e.target.value))}
                                />
                                <label className="ml-3">End Date: </label>
                                <input
                                    type="date"
                                    onChange={(e) => setEndDate(new Date(e.target.value))}
                                />
                            </div>

                            <div className="col-md-6">
                                <h4 className="my-5">Filtered by Status</h4>
                                <label>Status: </label>
                                <select
                                    onChange={(e) => setSelectedStatus(e.target.value)}
                                    value={selectedStatus}
                                >
                                    <option value="">All</option>
                                    <option value="Processing">Processing</option>
                                    <option value="Approved">Approved</option>
                                    <option value="Received">Received</option>
                                </select>
                            </div>
                        </div>

                        <div className="row my-4">
                            <div className="col-md-6">
                                <h4 className="my-5">Filtered by Documents</h4>
                                <label>Document: </label>
                                <select
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
                            <div className="col-md-6">
                                <h4 className="my-5">Filtered by Grade</h4>
                                <label>Grade: </label>
                                <select
                                    onChange={(e) => {
                                        setSelectedGrade(e.target.value);
                                        console.log("Selected Grade:", e.target.value);
                                    }}
                                    value={selectedGrade}
                                >
                                    <option value="">All</option>
                                    <option value="1">Grade 1</option>
                                    <option value="2">Grade 2</option>
                                    <option value="3">Grade 3</option>
                                    <option value="4">Grade 4</option>
                                    <option value="5">Grade 5</option>
                                    <option value="6">Grade 6</option>
                                    <option value="7">Grade 7</option>
                                    <option value="8">Grade 8</option>
                                    <option value="9">Grade 9</option>
                                    <option value="10">Grade 10</option>
                                    <option value="11">Grade 11</option>
                                    <option value="12">Grade 12</option>
                                </select>
                            </div>

                        </div>

                        {loading ? (
                            <Loader />
                        ) : (
                            <MDBDataTable data={setRequests()} className="px-3" bordered striped hover />
                        )}
                    </Fragment>
                </div>
            </div>
        </Fragment>
    );
};

export default RequestsList;





