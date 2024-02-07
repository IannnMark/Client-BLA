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
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");

    const dispatch = useDispatch();
    const violationState = useSelector((state) => state.violation);
    // const { error, violation } = useSelector((state) => state.violation);
    const { error, violation } = useSelector((state) => state.violationDetails); // Use the correct selector
    const { loading, error: updateError, isUpdated } = useSelector(
        (state) => state.violation
    );

    let { id } = useParams();
    console.log('ID:', id);// Add this line to check the value of id
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
                console.log('Redux State After Fetch:', violationState);
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

        console.log('ID in submitHandler:', id);
        console.log('Violation in submitHandler:', violation);
        console.log('Type in submitHandler:', type);
        console.log('Description in submitHandler:', description);

        // Check if violation and id are available
        if (!violation || !id) {
            console.error('Violation or ID is undefined');
            return;
        }

        // Check if type and description are available
        if (!type || !description) {
            console.error('Type or description is undefined');
            return;
        }

        const formData = {
            type,
            description,
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
                                    <label htmlFor="type_field">Type</label>
                                    <input
                                        type="text"
                                        id="type_field"
                                        className="form-control"
                                        value={type}
                                        onChange={(e) => setType(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="description_field">Description</label>
                                    <textarea
                                        id="description_field"
                                        className="form-control"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
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
