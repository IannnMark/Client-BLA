import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import RequestSteps from "./RequestSteps";
import { useDispatch, useSelector } from "react-redux";
import { createRequest, clearErrors } from "../../actions/inquiriesActions";
import { clearRequest } from "../../actions/requestActions";
import Purpose from "./Purpose";
import { toast } from "react-toastify";
import "./request.css";

const Payment = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { requestDocuments } = useSelector((state) => state.request);
    const { error, checkoutUrl } = useSelector((state) => state.newRequest);
    const [claimBySomeoneElse, setClaimBySomeoneElse] = useState(false);

    useEffect(() => {
        if (error) {
            dispatch(clearErrors());
        }
    }, [dispatch, error]);

    const request = {
        requestItems: requestDocuments,
    };

    const backToConfirmtHandler = () => {
        navigate("/confirm-request");
    };

    const requestInfo = JSON.parse(sessionStorage.getItem("requestInfo"));

    if (requestInfo) {
        request.itemsPrice = requestInfo.itemsPrice;
        request.totalPrice = requestInfo.totalPrice;
    }

    const [paymentMethod, setPaymentMethod] = useState("cash");
    const [selectedPurpose, setSelectedPurpose] = useState("");
    const [authorizationLetter, setAuthorizationLetter] = useState([]);
    const [authorizationLetterPreview, setAuthorizationLetterPreview] = useState(
        []
    );
    const [checkoutReady, setCheckoutReady] = useState(false);

    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method);
    };

    const handlePurposeChange = (purpose) => {
        setSelectedPurpose(purpose);
    };

    const handleClaimBySomeoneElseChange = () => {
        setClaimBySomeoneElse(!claimBySomeoneElse);
    };

    const handleAuthorizationLetterChange = (e) => {
        const files = Array.from(e.target.files);

        setAuthorizationLetterPreview([]);
        setAuthorizationLetter([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAuthorizationLetterPreview((oldArray) => [
                        ...oldArray,
                        reader.result,
                    ]);
                    setAuthorizationLetter((oldArray) => [...oldArray, reader.result]);
                }
            };

            reader.readAsDataURL(file);
        });
    };

    const errMsg = (message = "") =>
        toast.error(message, {
            position: toast.POSITION.BOTTOM_CENTER,
        });

    // const submitHandler = async (e) => {
    //     e.preventDefault();
    //     document.querySelector("#back_btn").disabled = true;

    //     const paymentInfo = {
    //         type: paymentMethod === "gcash" ? "Gcash" : "Cash",
    //     };

    //     const requestInfoWithPayment = {
    //         ...request,
    //         paymentInfo,
    //         purpose: selectedPurpose,
    //         authorizationLetter,
    //     };

    //     try {
    //         // Dispatch createRequest action
    //         await dispatch(createRequest(requestInfoWithPayment));

    //         // Log before clearing the request
    //         console.log("Request before clear:", request);

    //         // Clear request after successful request creation
    //         dispatch(clearRequest());

    //         // Log after clearing the request
    //         console.log("Request after clear:", request);

    //         if (paymentMethod === "Cash") {
    //             navigate("/request-success");
    //         } else {
    //             setCheckoutReady(true);
    //         }
    //     } catch (error) {
    //         // Handle any errors here
    //         console.error("Error:", error);
    //     }
    // };



    const submitHandler = async (e) => {
        e.preventDefault();
        document.querySelector("#back_btn").disabled = true;

        // const paymentInfo = {
        //     type: paymentMethod === "gcash" ? "Gcash" : "Cash",
        // };

        const paymentInfo = paymentMethod === "gcash" ? "Gcash" : "Cash";

        const requestInfoWithPayment = {
            ...request,
            paymentInfo,
            purpose: selectedPurpose,
            authorizationLetter,
        };

        try {
            // Dispatch createRequest action
            await dispatch(createRequest(requestInfoWithPayment));

            // Log before clearing the request
            console.log("Request before clear:", request);

            // Clear request after successful request creation
            dispatch(clearRequest());

            // Log after clearing the request
            console.log("Request after clear:", request);

            if (paymentMethod === "Cash") {
                navigate("/request-success");
            } else {
                setCheckoutReady(true);
            }
        } catch (error) {
            // Handle any errors here
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        if (checkoutUrl && checkoutReady) {
            const newWindow = window.open(checkoutUrl);
            if (
                !newWindow ||
                newWindow.closed ||
                typeof newWindow.closed === "undefined"
            ) {
                console.error(
                    "Pop-up was blocked. Please allow pop-ups from this site to proceed."
                );
            } else {
                console.log("Opening checkout URL:", checkoutUrl);
                navigate("/request-success");
            }
        }
    }, [checkoutUrl, checkoutReady, navigate]);

    return (
        <Fragment>
            <MetaData title={"Payment"} />
            <RequestSteps shipping confirmRequest payment />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-4">Payment Method</h1>

                        <Purpose
                            selectedPurpose={selectedPurpose}
                            onPurposeChange={handlePurposeChange}
                        />

                        <div className="form-group">
                            <label>Select Payment Method:</label>
                            <div className="d-flex justify-content-around">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="paymentMethod"
                                        id="cashMethod"
                                        value="Cash"
                                        checked={paymentMethod === "Cash"}
                                        onChange={() => handlePaymentMethodChange("Cash")}
                                    />
                                    <label className="form-check-label" htmlFor="cashMethod">
                                        Cash
                                    </label>
                                </div>

                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="paymentMethod"
                                        id="gcashMethod"
                                        value="gcash"
                                        checked={paymentMethod === "gcash"}
                                        onChange={() => handlePaymentMethodChange("gcash")}
                                    />
                                    <label className="form-check-label" htmlFor="gcashMethod">
                                        Gcash
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="claimBySomeoneElse"
                                id="claimBySomeoneElse"
                                checked={claimBySomeoneElse}
                                onChange={handleClaimBySomeoneElseChange}
                            />
                            <label className="form-check-label" htmlFor="claimBySomeoneElse">
                                Someone else will claim? Upload Authorization Letter here.
                            </label>
                        </div>

                        {claimBySomeoneElse && (
                            <div className="form-group">
                                <label htmlFor="authorizationLetter">
                                    Authorization Letter:
                                </label>
                                <input
                                    type="file"
                                    id="authorizationLetter"
                                    onChange={handleAuthorizationLetterChange}
                                    accept="image/*"
                                    multiple
                                    className="form-control"
                                />
                                {authorizationLetterPreview.map((img) => (
                                    <img
                                        src={img}
                                        key={img}
                                        alt="Authorization Letter Preview"
                                        className="mt-3 mr-2"
                                        width="55"
                                        height="52"
                                    />
                                ))}
                            </div>
                        )}

                        <div className="button-container">
                            <button
                                id="back_btn"
                                className="btn py-2 custom-button-width"
                                onClick={backToConfirmtHandler}
                            >
                                <i className="fa fa-arrow-left" aria-hidden="true"></i> Back
                            </button>

                            <button
                                id="back_btn"
                                type="submit"
                                className="btn py-2 custom-button-width"
                            >
                                Pay - {requestInfo && requestInfo.totalPrice}
                            </button>

                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default Payment;