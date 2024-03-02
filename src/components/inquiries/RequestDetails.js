import React, { Fragment, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getRequestDetails, clearErrors } from "../../actions/inquiriesActions";

const RequestDetails = () => {
  const dispatch = useDispatch();
  const {
    loading,
    error,
    request = {},
  } = useSelector((state) => state.requestDetails);

  const { requestItems, requestStatus } =
    request;

  let { id } = useParams();

  useEffect(() => {
    dispatch(getRequestDetails(id));

    if (error) {
      dispatch(clearErrors());
    }
  }, [dispatch, error, id]);

  console.log(request);

  return (
    <Fragment>
      <MetaData title={"Request Details"} />

      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8 mt-5 request-details">
              <h1 className="my-4">Request # {request._id}</h1>

              <hr />

              <h4 className="my-4">Full Name:</h4>

              <p className={request.user?.lastname && String(request.user.lastname)}>
                <b>{`${request.user?.firstname || "N/A"} ${request.user?.lastname || "N/A"}`}</b>
              </p>

              <hr />

              <h4 className="my-4">Payment Info:</h4>

              {request.paymentInfo ? (
                <div>
                  {(() => {
                    // Parse the JSON string
                    try {
                      const paymentInfoObject = JSON.parse(request.paymentInfo);
                      return (
                        <>
                          {paymentInfoObject.type !== undefined ? (
                            <p>
                              <b>Type:</b> {paymentInfoObject.type}
                            </p>
                          ) : (
                            <p>
                              <b>Type:</b> N/A
                            </p>
                          )}
                        </>
                      );
                    } catch (error) {
                      console.error("Error parsing paymentInfo:", error);
                      return (
                        <p>
                          <b>Error parsing paymentInfo</b>
                        </p>
                      );
                    }
                  })()}
                </div>
              ) : (
                <p>
                  <b>Type:</b> N/A
                </p>
              )}

              {request.purpose ? (
                <div>
                  <h4 className="my-4">Purpose:</h4>
                  <p>
                    {request.purpose}
                  </p>
                </div>
              ) : (
                <p>
                  <b>Purpose:</b> N/A
                </p>
              )}

              <hr />

              <h4 className="my-4">Request Status:</h4>

              <p
                className={
                  request.requestStatus &&
                    String(request.requestStatus).includes("Received")
                    ? "greenColor"
                    : "redColor"
                }
              >
                <b>{requestStatus}</b>
              </p>

              <h4 className="my-4">Request Items:</h4>

              <hr />

              <div className="cart-item my-1">
                {requestItems &&
                  requestItems.map((item) => (
                    <div key={item.document} className="row m-5">
                      <div className="col-4 col-lg-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          height="45"
                          width="65"
                        />
                      </div>
                      <div className="col-5 col-lg-5">
                        <Link to={`/documents/${item.document}`}>
                          {item.name}
                        </Link>
                      </div>

                      <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p>${item.price}</p>
                      </div>

                      <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                        <p>{item.quantity} Piece(s)</p>
                      </div>
                    </div>
                  ))}
              </div>

              <hr />
            </div>
          </div>
        </Fragment>
      )}
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </Fragment>
  );
};

export default RequestDetails;
