import React, { Fragment, useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { getAllBalance, clearErrors } from "../../actions/balanceActions";

const BalanceHistory = () => {
    const dispatch = useDispatch();
    const [selectedStatus, setSelectedStatus] = useState("");
    const { loading, error, allbalances } = useSelector((state) => state.allbalances);

    useEffect(() => {
        dispatch(getAllBalance(selectedStatus));

        if (error) {
            dispatch(clearErrors());
        }
    }, [dispatch, error, selectedStatus]);

    const setBalanceLogsData = () => {
        const data = {
            columns: [
                {
                    label: "Student Name",
                    field: "studentName",
                    sort: "asc",
                },
                {
                    label: "Balance Info",
                    field: "balanceInfo",
                    sort: "asc",
                },
                {
                    label: "Status",
                    field: "status",
                    sort: "asc",
                },
                {
                    label: "Amount Paid",
                    field: "amountPaid",
                    sort: "asc",
                },
                {
                    label: "Recorded By",
                    field: "recordBy",
                    sort: "asc",
                },
                {
                    label: "Date",
                    field: "date",
                    sort: "asc",
                },
            ],
            rows: [],
        };

        if (allbalances && allbalances.length > 0) {
            allbalances.forEach((log) => {
                // Check if the selected status is empty or matches the log status
                if (!selectedStatus || log.status === selectedStatus) {
                    data.rows.push({
                        studentName: log.studentName,
                        balanceInfo: log.balanceInfo,
                        status: log.status,
                        amountPaid: log.amountPaid,
                        recordBy: log.recordBy,
                        date: new Date(log.createdAt).toLocaleString(),
                    });
                }
            });
        }

        // Sort the rows by createdAt from latest to oldest
        data.rows.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        return data;
    };

    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
    };

    return (
        <Fragment>
            <MetaData title={"Balance History"} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">Balance History</h1>
                        <div className="mb-4">
                            <label htmlFor="statusFilter">Filter by Status</label>
                            <select
                                id="statusFilter"
                                className="form-control"
                                value={selectedStatus}
                                onChange={handleStatusChange}
                            >
                                <option value="">All</option>
                                <option value="Settled">Settled</option>
                                <option value="Unsettled">Unsettled</option>
                            </select>
                        </div>
                        <div className="custom-mdb-datatable">
                            {loading ? (
                                <Loader />
                            ) : (
                                <MDBDataTable
                                    data={setBalanceLogsData()}
                                    className="px-3 custom-mdb-datatable"
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
                                />
                            )}
                        </div>
                    </Fragment>
                </div>
            </div>
        </Fragment>
    );
};

export default BalanceHistory;
