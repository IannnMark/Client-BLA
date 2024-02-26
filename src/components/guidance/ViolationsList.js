import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";

import {
    getGuidanceViolations,
    deleteViolation,
    clearErrors,
} from "../../actions/violationActions";

import { DELETE_VIOLATION_RESET } from "../../constants/violationConstants";

const ViolationsList = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const { loading, error, violations } = useSelector((state) => state.violations);

    const { error: deleteError, isDeleted } = useSelector((state) => state.violation || {});

    useEffect(() => {
        dispatch(getGuidanceViolations());

        if (error) {
            dispatch(clearErrors());
        }

        if (deleteError) {
            dispatch(clearErrors());
        }

        if (isDeleted) {
            navigate("/guidance/violations");
            dispatch({ type: DELETE_VIOLATION_RESET });
        }
    }, [dispatch, error, deleteError, isDeleted, navigate]);

    const setViolations = () => {
        const data = {
            columns: [
                // { label: "ID", field: "id", sort: "asc" },
                // { label: "User ID", field: "userId", sort: "asc" },
                { label: "Student Last Name", field: "lastname", sort: "asc" },
                { label: "Grade", field: "grade", sort: "asc" },
                { label: "Violation Type", field: "type", sort: "asc" },
                { label: "Description", field: "description", sort: "asc" },
                { label: "Date", field: "date", sort: "asc" },
                { label: "Actions", field: "actions" },
            ],
            rows: [],
        };

        violations.forEach((violation) => {
            data.rows.push({
                // id: violation._id,
                // userId: violation.user._id,
                lastname: violation.lastname,
                grade: violation.grade,
                type: violation.type,
                description: violation.description,
                date: new Date(violation.date).toLocaleDateString(),
                actions: (
                    <Fragment>
                        <Link
                            to={`/guidance/violation/${violation._id}`}
                            className="btn btn-primary py-1 px-2"
                        >
                            <i className="fa fa-pencil"></i>
                        </Link>
                        <button
                            className="btn btn-danger py-1 px-2 ml-2"
                            onClick={() => deleteViolationHandler(violation._id)}
                        >
                            <i className="fa fa-trash"></i>
                        </button>
                    </Fragment>
                ),
            });
        });

        return data;
    };

    const deleteViolationHandler = (id) => {
        dispatch(deleteViolation(id));
    };

    return (
        <Fragment>
            <MetaData title={"All Violations"} />

            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">All Violations</h1>

                        {loading ? <Loader /> : <MDBDataTable data={setViolations()} className="px-3" bordered striped hover />}
                    </Fragment>
                </div>
            </div>
        </Fragment>
    );
};

export default ViolationsList;


