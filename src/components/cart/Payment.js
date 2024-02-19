// import React, { Fragment, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import MetaData from "../layout/MetaData";
// import CheckoutSteps from "./CheckoutSteps";
// import { useDispatch, useSelector } from "react-redux";
// import { createOrder, clearErrors } from "../../actions/orderActions";
// import { clearCart } from "../../actions/cartActions";

// const Payment = () => {
//   const dispatch = useDispatch();
//   let navigate = useNavigate();
//   const { cartItems } = useSelector((state) => state.cart);
//   const { error } = useSelector((state) => state.newOrder);

//   useEffect(() => {
//     if (error) {
//       dispatch(clearErrors());
//     }
//   }, [dispatch, error]);

//   const order = {
//     orderItems: cartItems
//   };

//   const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

//   if (orderInfo) {
//     order.itemsPrice = orderInfo.itemsPrice;
//     order.totalPrice = orderInfo.totalPrice;
//   }


//   const [paymentMethod, setPaymentMethod] = useState("cash");
//   const [proofOfBilling, setProofOfBilling] = useState([]);

//   const handlePaymentMethodChange = (method) => {
//     setPaymentMethod(method);
//     // Clear proof of billing when switching payment methods
//     setProofOfBilling([]);
//   };

//   const handleProofOfBillingChange = (e) => {
//     setProofOfBilling(Array.from(e.target.files));
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();

//     const paymentInfo = paymentMethod === "gcash" ? "Gcash" : "Cash";
//     order.paymentInfo = paymentInfo;

//     order.paymentInfo = paymentInfo;

//     dispatch(createOrder(order));
//     dispatch(clearCart());

//     navigate("/success");
//   };

//   return (
//     <Fragment>
//       <MetaData title={"Payment"} />
//       <CheckoutSteps shipping confirmOrder payment />

//       <div className="row wrapper">
//         <div className="col-10 col-lg-5">
//           <form className="shadow-lg" onSubmit={submitHandler}>
//             <h1 className="mb-4">Payment Method</h1>

//             <div className="form-group">
//               <label>Select Payment Method:</label>
//               <div className="d-flex justify-content-around">
//                 <div className="form-check">
//                   <input
//                     className="form-check-input"
//                     type="radio"
//                     name="paymentMethod"
//                     id="cashMethod"
//                     value="cash"
//                     checked={paymentMethod === "cash"}
//                     onChange={() => handlePaymentMethodChange("cash")}
//                   />
//                   <label className="form-check-label" htmlFor="cashMethod">
//                     Cash
//                   </label>
//                 </div>

//                 <div className="form-check">
//                   <input
//                     className="form-check-input"
//                     type="radio"
//                     name="paymentMethod"
//                     id="gcashMethod"
//                     value="gcash"
//                     checked={paymentMethod === "gcash"}
//                     onChange={() => handlePaymentMethodChange("gcash")}
//                   />
//                   <label className="form-check-label" htmlFor="gcashMethod">
//                     Gcash
//                   </label>
//                 </div>
//               </div>
//             </div>

//             {paymentMethod === "gcash" && (
//               <div className="form-group">
//                 <label htmlFor="proofOfBilling">Proof of Billing for Gcash:</label>
//                 <input
//                   type="file"
//                   id="proofOfBilling"
//                   onChange={handleProofOfBillingChange}
//                   accept="image/*"
//                   multiple
//                   className="form-control"
//                 />
//               </div>
//             )}

//             <button type="submit" className="btn btn-block py-3">
//               Pay - {orderInfo && orderInfo.totalPrice}
//             </button>
//           </form>
//         </div>
//       </div>
//     </Fragment>
//   );
// };

// export default Payment;




import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, clearErrors } from "../../actions/orderActions";
import { clearCart } from "../../actions/cartActions";

const Payment = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const { error } = useSelector((state) => state.newOrder);

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  const order = {
    orderItems: cartItems,
  };

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  if (orderInfo) {
    order.itemsPrice = orderInfo.itemsPrice;
    order.totalPrice = orderInfo.totalPrice;
  }

  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [gcashInfo, setGcashInfo] = useState({
    account_name: "",
    phone_number: "",
  });
  const [showGcashForm, setShowGcashForm] = useState(false);

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    setGcashInfo({
      account_name: "",
      phone_number: "",
    });
    setShowGcashForm(method === "gcash");
  };

  const handleGcashInfoChange = (e) => {
    setGcashInfo({
      ...gcashInfo,
      [e.target.name]: e.target.value,
    });
  };

  // const submitHandler = async (e) => {
  //   e.preventDefault();

  //   const paymentInfo = paymentMethod === "gcash" ? gcashInfo : "Cash";
  //   order.paymentInfo = paymentInfo;

  //   try {
  //     // Dispatch the createOrder action and wait for it to complete
  //     await dispatch(createOrder(order));
  //     dispatch(clearCart());

  //     if (paymentMethod === "gcash") {
  //       if (!gcashInfo.account_name || !gcashInfo.phone_number) {
  //         console.error("GCash Account Name and Phone Number are required");
  //         return;
  //       }

  //       // Wait for the order creation to complete before proceeding
  //       await new Promise((resolve) => setTimeout(resolve, 1000));

  //       const confirmationUrl = await createPaymentIntent(order);

  //       // Redirect to the confirmation URL
  //       window.location.href = confirmationUrl;
  //     } else {
  //       // If not using GCash, navigate to success page
  //       navigate("/success");
  //     }
  //   } catch (error) {
  //     console.error('Error during payment intent creation:', error.message);
  //   }
  // };


  const submitHandler = async (e) => {
    e.preventDefault();

    const paymentInfo = paymentMethod === "gcash" ? gcashInfo : "Cash";
    order.paymentInfo = paymentInfo;

    try {
      // Dispatch the createOrder action and wait for it to complete
      await dispatch(createOrder(order));
      dispatch(clearCart());

      if (paymentMethod === "gcash") {
        if (!gcashInfo.account_name || !gcashInfo.phone_number) {
          console.error("GCash Account Name and Phone Number are required");
          return;
        }

        // Wait for the order creation to complete before proceeding
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const confirmationUrl = await createPaymentIntent(order);

        // Open PayMongo payment page in a new window or tab
        window.open(confirmationUrl, '_blank');
      } else {
        // If not using GCash, navigate to success page
        navigate("/success");
      }
    } catch (error) {
      console.error('Error during payment intent creation:', error.message);
    }
  };




  const createPaymentIntent = async (order) => {
    try {
      const response = await fetch('/api/v1/order/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });

      console.log('Response:', response);

      if (!response.ok) {
        throw new Error(`Failed to create PaymentIntent: ${response.status} - ${response.statusText}`);
      }

      const result = await response.json();

      if (result && result.success && result.order && result.order.paymentIntent) {
        console.log('Result:', result);

        return result.order.paymentIntent;
      } else {
        console.error('Unexpected response structure:', result);
        throw new Error('Unexpected response structure');
      }
    } catch (error) {
      console.error('Error during payment intent creation:', error.message);
      throw error; // Rethrow the error for further analysis
    }
  };








  return (
    <Fragment>
      <MetaData title={"Payment"} />
      <CheckoutSteps shipping confirmOrder payment />

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-4">Payment Method</h1>

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
                    GCash
                  </label>
                </div>
              </div>
            </div>

            {showGcashForm && (
              <div>
                <div className="form-group">
                  <label htmlFor="accountName">GCash Account Name:</label>
                  <input
                    type="text"
                    id="account_name"
                    name="account_name"
                    value={gcashInfo.account_name}
                    onChange={handleGcashInfoChange}
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phoneNumber">GCash Phone Number:</label>
                  <input
                    type="text"
                    id="phone_number"
                    name="phone_number"
                    value={gcashInfo.phone_number}
                    onChange={handleGcashInfoChange}
                    className="form-control"
                  />
                </div>
              </div>
            )}

            <button type="submit" className="btn btn-block py-3">
              Pay - {orderInfo && orderInfo.totalPrice}
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Payment;
