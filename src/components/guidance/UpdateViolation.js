import React, { Fragment, useState, useEffect } from "react";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateViolation, clearErrors, getViolationDetails } from "../../actions/violationActions";
import { UPDATE_VIOLATION_RESET } from "../../constants/violationConstants";

const UpdateViolation = () => {
    const [status, setStatus] = useState("");

    const dispatch = useDispatch();
    const { error, violation } = useSelector((state) => state.violationDetails);
    const { loading, error: updateError, isUpdated } = useSelector(
        (state) => state.violation
    );

    let { id } = useParams();
    let navigate = useNavigate();

    const errMsg = (message = "") =>
        toast.error(message, {
            position: toast.POSITION.BOTTOM_CENTER,
        });

    const successMsg = (message = "") =>
        toast.success(message, {
            position: toast.POSITION.BOTTOM_CENTER,
        });

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(getViolationDetails(id));
            } catch (error) {
                errMsg(`Error fetching violation details: ${error.message}`);
                dispatch(clearErrors());
            }
        };

        fetchData();

        if (error) {
            errMsg(error);
            dispatch(clearErrors());
        }

        if (updateError) {
            errMsg(updateError);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            navigate("/guidance/violations");
            successMsg("Violation updated successfully");
            dispatch({ type: UPDATE_VIOLATION_RESET });
        }
    }, [dispatch, id, error, updateError, isUpdated, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();

        if (!violation || !id) {
            console.error('Violation or ID is undefined');
            return;
        }

        const formData = {
            status,
        };

        dispatch(updateViolation(violation._id, formData));
    };

    return (
        <Fragment>
            <MetaData title={"Update Violation"} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form
                                className="shadow-lg"
                                onSubmit={submitHandler}
                            >
                                <h1 className="mb-4">Update Violation</h1>

                                <div className="form-group">
                                    <label htmlFor="status_field">Status</label>
                                    <select
                                        id="status_field"
                                        className="form-control"
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                    >
                                        <option value="">Select Status</option>
                                        <option value="Community Service">Community Service</option>
                                        <option value="Parent Meeting">Parent Meeting</option>
                                        <option value="With Violation">With Violation</option>
                                    </select>
                                </div>

                                <button
                                    id="login_button"
                                    type="submit"
                                    className="btn btn-block py-3"
                                    disabled={loading ? true : false}
                                >
                                    UPDATE
                                </button>
                            </form>
                        </div>
                    </Fragment>
                </div>
            </div>
        </Fragment>
    );
};

export default UpdateViolation;
