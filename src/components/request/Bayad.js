// import React, { Fragment, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import MetaData from "../layout/MetaData";
// import RequestSteps from "./RequestSteps";
// import { useDispatch, useSelector } from "react-redux";
// import { createRequest, clearErrors } from "../../actions/inquiriesActions";
// import { clearRequest } from "../../actions/requestActions";
// import Purpose from "./Purpose";

// const Payment = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();


//     const { requestDocuments } = useSelector((state) => state.request);
//     const { error } = useSelector((state) => state.newRequest);
//     const [claimBySomeoneElse, setClaimBySomeoneElse] = useState(false);

//     useEffect(() => {
//         if (error) {
//             dispatch(clearErrors());
//         }
//     }, [dispatch, error]);

//     const request = {
//         requestItems: requestDocuments,
//     };

//     const requestInfo = JSON.parse(sessionStorage.getItem("requestInfo"));

//     if (requestInfo) {
//         request.itemsPrice = requestInfo.itemsPrice;
//         request.totalPrice = requestInfo.totalPrice;
//     }

//     const [paymentMethod, setPaymentMethod] = useState("cash");
//     const [setProofOfBilling] = useState([]);
//     const [selectedPurpose, setSelectedPurpose] = useState("");
//     const [authorizationLetter, setAuthorizationLetter] = useState([]);
//     const [authorizationLetterPreview, setAuthorizationLetterPreview] = useState([]);

//     const handlePaymentMethodChange = (method) => {
//         setPaymentMethod(method);
//         setProofOfBilling([]);
//     };

//     const handleProofOfBillingChange = (e) => {
//         setProofOfBilling(Array.from(e.target.files));
//     };

//     const handlePurposeChange = (purpose) => {
//         setSelectedPurpose(purpose);
//     };

//     const handleClaimBySomeoneElseChange = () => {
//         setClaimBySomeoneElse(!claimBySomeoneElse);
//     };

//     const handleAuthorizationLetterChange = (e) => {
//         const files = Array.from(e.target.files);

//         setAuthorizationLetterPreview([]);
//         setAuthorizationLetter([]);

//         files.forEach((file) => {
//             const reader = new FileReader();

//             reader.onload = () => {
//                 if (reader.readyState === 2) {
//                     setAuthorizationLetterPreview((oldArray) => [...oldArray, reader.result]);
//                     setAuthorizationLetter((oldArray) => [...oldArray, reader.result]);
//                 }
//             };

//             reader.readAsDataURL(file);
//         });
//     };

//     const submitHandler = async (e) => {
//         e.preventDefault();

//         const paymentInfo = paymentMethod === "gcash" ? "Gcash" : "Cash";
//         request.paymentInfo = paymentInfo;
//         request.purpose = selectedPurpose;
//         request.authorizationLetter = authorizationLetter;

//         dispatch(createRequest(request));
//         dispatch(clearRequest());

//         navigate("/request-success");
//     };

//     return (
//         <Fragment>
//             <MetaData title={"Payment"} />
//             <RequestSteps shipping confirmRequest payment />
//             <div className="row wrapper">
//                 <div className="col-10 col-lg-5">
//                     <form className="shadow-lg" onSubmit={submitHandler}>
//                         <h1 className="mb-4">Payment Method</h1>


//                         <Purpose
//                             selectedPurpose={selectedPurpose}
//                             onPurposeChange={handlePurposeChange}
//                         />

//                         <div className="form-group">
//                             <label>Select Payment Method:</label>
//                             <div className="d-flex justify-content-around">
//                                 <div className="form-check">
//                                     <input
//                                         className="form-check-input"
//                                         type="radio"
//                                         name="paymentMethod"
//                                         id="cashMethod"
//                                         value="cash"
//                                         checked={paymentMethod === "cash"}
//                                         onChange={() => handlePaymentMethodChange("cash")}
//                                     />
//                                     <label className="form-check-label" htmlFor="cashMethod">
//                                         Cash
//                                     </label>
//                                 </div>
//                                 <div className="form-check">
//                                     <input
//                                         className="form-check-input"
//                                         type="radio"
//                                         name="paymentMethod"
//                                         id="gcashMethod"
//                                         value="gcash"
//                                         checked={paymentMethod === "gcash"}
//                                         onChange={() => handlePaymentMethodChange("gcash")}
//                                     />
//                                     <label className="form-check-label" htmlFor="gcashMethod">
//                                         Gcash
//                                     </label>
//                                 </div>
//                             </div>
//                         </div>

//                         {paymentMethod === "gcash" && (
//                             <div className="form-group">
//                                 <label htmlFor="proofOfBilling">Proof of Billing for Gcash:</label>
//                                 <input
//                                     type="file"
//                                     id="proofOfBilling"
//                                     onChange={handleProofOfBillingChange}
//                                     accept="image/*"
//                                     multiple
//                                     className="form-control"
//                                 />
//                             </div>
//                         )}


//                         <div className="form-check">
//                             <input
//                                 className="form-check-input"
//                                 type="radio"
//                                 name="claimBySomeoneElse"
//                                 id="claimBySomeoneElse"
//                                 checked={claimBySomeoneElse}
//                                 onChange={handleClaimBySomeoneElseChange}
//                             />
//                             <label className="form-check-label" htmlFor="claimBySomeoneElse">
//                                 Someone else will claim? Upload Authorization Letter here.
//                             </label>
//                         </div>

//                         {claimBySomeoneElse && (
//                             <div className="form-group">
//                                 <label htmlFor="authorizationLetter">Authorization Letter:</label>
//                                 <input
//                                     type="file"
//                                     id="authorizationLetter"
//                                     onChange={handleAuthorizationLetterChange}
//                                     accept="image/*"
//                                     multiple
//                                     className="form-control"
//                                 />
//                                 {authorizationLetterPreview.map((img) => (
//                                     <img
//                                         src={img}
//                                         key={img}
//                                         alt="Authorization Letter Preview"
//                                         className="mt-3 mr-2"
//                                         width="55"
//                                         height="52"
//                                     />
//                                 ))}
//                             </div>
//                         )}




//                         <button type="submit" className="btn btn-block py-3">
//                             Pay - {requestInfo && requestInfo.totalPrice}
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </Fragment>
//     );
// };

// export default Payment;








import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import RequestSteps from "./RequestSteps";
import { useDispatch, useSelector } from "react-redux";
import { createRequest, clearErrors } from "../../actions/inquiriesActions";
import { clearRequest } from "../../actions/requestActions";
import Purpose from "./Purpose";
import { toast } from "react-toastify";

const Payment = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { requestDocuments } = useSelector((state) => state.request);
    const { error } = useSelector((state) => state.newRequest);
    const [claimBySomeoneElse, setClaimBySomeoneElse] = useState(false);

    useEffect(() => {
        if (error) {
            dispatch(clearErrors());
        }
    }, [dispatch, error]);

    const request = {
        requestItems: requestDocuments,
    };

    const requestInfo = JSON.parse(sessionStorage.getItem("requestInfo"));

    if (requestInfo) {
        request.itemsPrice = requestInfo.itemsPrice;
        request.totalPrice = requestInfo.totalPrice;
    }

    const [paymentMethod, setPaymentMethod] = useState("cash");
    const [screenShot, setScreenshot] = useState([]);
    const [screenshotPreview, setScreenshotPreview] = useState([]);
    const [referenceNumber, setReferenceNum] = useState("");
    const [referenceNumError, setReferenceNumError] = useState("");
    const [selectedPurpose, setSelectedPurpose] = useState("");
    const [authorizationLetter, setAuthorizationLetter] = useState([]);
    const [authorizationLetterPreview, setAuthorizationLetterPreview] = useState([]);

    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method);
        setScreenshot([]);
    };

    const handleScreenshotChange = (e) => {
        const files = Array.from(e.target.files);

        setScreenshotPreview([]);
        setScreenshot([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setScreenshotPreview((oldArray) => [...oldArray, reader.result]);
                    setScreenshot((oldArray) => [...oldArray, reader.result]);
                }
            };

            reader.readAsDataURL(file);
        });
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
                    setAuthorizationLetterPreview((oldArray) => [...oldArray, reader.result]);
                    setAuthorizationLetter((oldArray) => [...oldArray, reader.result]);
                }
            };

            reader.readAsDataURL(file);
        });
    };

    const validateReferenceNum = () => {
        if (paymentMethod === "gcash" && referenceNumber.length !== 13) {
            setReferenceNumError("Reference # must be exactly 13 numbers");
            return false;
        } else {
            setReferenceNumError("");
            return true;
        }
    };

    const errMsg = (message = "") =>
        toast.error(message, {
            position: toast.POSITION.BOTTOM_CENTER,
        });

    const submitHandler = async (e) => {
        e.preventDefault();
        document.querySelector("#pay_btn").disabled = true;

        if (!validateReferenceNum()) {
            return;
        }

        if (paymentMethod === "gcash" && screenShot.length === 0) {
            errMsg("Screenshot is required for Gcash payment");
            return;
        }

        const paymentInfo = {
            type: paymentMethod === "gcash" ? "Gcash" : "Cash",
        };

        const requestInfoWithPayment = {
            ...request,
            paymentInfo: JSON.stringify(paymentInfo),
            purpose: selectedPurpose,
            screenShot,
            authorizationLetter,
            referenceNumber,
        };

        dispatch(createRequest(requestInfoWithPayment));
        dispatch(clearRequest());

        navigate("/request-success");
    };



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
                                        value="cash"
                                        checked={paymentMethod === "cash"}
                                        onChange={() => handlePaymentMethodChange("cash")}
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

                        {paymentMethod === "gcash" && (
                            <div className="form-group">
                                <div style={{ textAlign: "center" }}>
                                    <img
                                        src="/images/gcashQr.jpg"
                                        alt="GCash QR Code"
                                        style={{
                                            width: "50%",
                                            height: "auto",
                                            marginBottom: "10px",
                                            display: "block",
                                            marginLeft: "auto",
                                            marginRight: "auto",
                                        }}
                                    />
                                </div>

                                <label htmlFor="screenshot">Screenshot for Gcash:</label>
                                <input
                                    type="file"
                                    id="screenshot"
                                    onChange={handleScreenshotChange}
                                    accept="image/*"
                                    multiple
                                    className="form-control"
                                />
                                {screenshotPreview.map((img) => (
                                    <img
                                        src={img}
                                        key={img}
                                        alt="Screenshot Preview"
                                        className="mt-3 mr-2"
                                        width="55"
                                        height="52"
                                    />
                                ))}
                            </div>
                        )}
                        {paymentMethod === "gcash" && (
                            <div className="mb-3">
                                <label htmlFor="referenceNumber" className="form-label">
                                    Reference #:
                                </label>
                                <input
                                    type="text"
                                    id="referenceNum"
                                    className={`form-control ${referenceNumError ? "is-invalid" : ""}`}
                                    value={referenceNumber}
                                    onChange={(e) => setReferenceNum(e.target.value)}
                                    onBlur={validateReferenceNum}
                                    pattern="[0-9]{13}"
                                    title="Reference # must be exactly 13 numeric numbers"
                                />

                                {referenceNumError && (
                                    <div className="invalid-feedback">{referenceNumError}</div>
                                )}
                            </div>
                        )}


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
                                <label htmlFor="authorizationLetter">Authorization Letter:</label>
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


                        <button id="pay_btn" type="submit" className="btn btn-block py-3">
                            Pay - {requestInfo && requestInfo.totalPrice}
                        </button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default Payment;
