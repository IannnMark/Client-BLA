import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getCashierBalance, deleteBalance, clearErrors } from "../../actions/balanceActions";
import { DELETE_BALANCE_RESET } from "../../constants/balanceConstants";


const BalanceList = () => {
    const dispatch = useDispatch();
    const { loading, error, balances } = useSelector((state) => state.balances);
    const { error: deleteError, isDeleted } = useSelector((state) => state.balance || {});

    useEffect(() => {
        dispatch(getCashierBalance());

        if (error) {
            dispatch(clearErrors());
        }

        if (deleteError) {
            dispatch(clearErrors());
        }

        if (isDeleted) {
            dispatch({ type: DELETE_BALANCE_RESET });
        }
    }, [dispatch, error, deleteError, isDeleted]);

    const setBalances = () => {
        const data = {
            columns: [
                { label: "No.", field: "index" }, // New column for sequential numbers
                { label: "Student Last Name", field: "lastname", sort: "asc" },
                { label: "Grade", field: "grade", sort: "asc" },
                { label: "Specific Balance", field: "specificBalance", sort: "asc" },
                { label: "Amount", field: "amount", sort: "asc" },
                { label: "Date Created", field: "createdAt", sort: "asc" },
                { label: "Actions", field: "actions" },

            ],
            rows: [],
        };

        if (balances) {
            balances.forEach((balance, index) => { // Add index to the map function
                data.rows.push({
                    lastname: balance.lastname,
                    grade: balance.grade,
                    specificBalance: balance.specificBalance,
                    amount: `₱${balance.amount}`,
                    createdAt: new Date(balance.createdAt).toLocaleDateString(),
                    actions: (
                        <Fragment>
                            <Link to={`/cashier/balance/${balance._id}`} className="btn btn-primary py-1 px-2">
                                <i className="fa fa-pencil"></i>
                            </Link>
                            {/* <button
                                className="btn btn-danger py-1 px-2 ml-2"
                                onClick={() => deleteBalanceHandler(balance._id)}
                            >
                                <i className="fa fa-trash"></i>
                            </button> */}
                        </Fragment>
                    ),
                    index: index + 1, // Add sequential number
                });
            });
        }
        return data;
    };

    const deleteBalanceHandler = (id) => {
        dispatch(deleteBalance(id));
    };

    return (
        <Fragment>
            <MetaData title={"All Balances"} />

            <div className="row">
                <div className="col-12 col-md-1">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10" style={{ marginTop: "80px" }}>
                    <Fragment>
                        <h1 className="my-5">All Students with Balances</h1>

                        {loading ? (
                            <Loader />
                        ) : (
                            <MDBDataTable data={setBalances()} className="px-4"
                                bordered
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

export default BalanceList;