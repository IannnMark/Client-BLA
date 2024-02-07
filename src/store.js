import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productsReducer,
  productDetailsReducer,
  newReviewReducer,
  newProductReducer,
  productReducer,
  reviewReducer,
  productReviewsReducer,
} from "./reducers/productReducers";

import {
  documentsReducer,
  documentDetailsReducer,
  newDocumentReducer,
  documentReducer,
} from "./reducers/documentReducers";

import {
  violationsReducer,
  newViolationReducer,
  violationReducer,
  violationDetailsReducer,
} from "./reducers/violationReducers";

import {
  authReducer,
  userReducer,
  forgotPasswordReducer,
  allUsersReducer,
  userDetailsReducer,
  customerSalesReducer,
  customerRequestsReducer,
} from "./reducers/userReducers";

import { cartReducer } from "./reducers/cartReducers";

import {
  newOrderReducer,
  myOrdersReducer,
  orderDetailsReducer,
  allOrdersReducer,
  orderReducer,
} from "./reducers/orderReducers";

import {
  newRequestReducer,
  myRequestsReducer,
  requestDetailsReducer,
  allRequestsReducer,
  inquiriesReducers
} from "./reducers/inquiriesReducers";

import {
  salesPerMonthReducer,
  productSalesReducer,
  requestsPerMonthReducer,
  documentSalesReducer,
} from "./reducers/chartReducers";

import {
  requestReducer
} from "./reducers/requestReducers"

const reducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  auth: authReducer,
  user: userReducer,
  forgotPassword: forgotPasswordReducer,
  request: requestReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  newReview: newReviewReducer,
  newProduct: newProductReducer,
  product: productReducer,
  allOrders: allOrdersReducer,
  order: orderReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  productReviews: productReviewsReducer,
  review: reviewReducer,
  customerSales: customerSalesReducer,
  salesPerMonth: salesPerMonthReducer,
  productSales: productSalesReducer,
  documents: documentsReducer,
  documentDetails: documentDetailsReducer,
  newDocument: newDocumentReducer,
  document: documentReducer,
  newRequest: newRequestReducer,
  myRequests: myRequestsReducer,
  requestDetails: requestDetailsReducer,
  allRequests: allRequestsReducer,
  inquiries: inquiriesReducers,
  violations: violationsReducer,
  newViolation: newViolationReducer,
  violation: violationReducer,
  violationDetails: violationDetailsReducer,
  requestsPerMonth: requestsPerMonthReducer,
  documentSales: documentSalesReducer,
  customerRequests: customerRequestsReducer,

});


let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    // shippingInfo: localStorage.getItem("shippingInfo")
    //   ? JSON.parse(localStorage.getItem("shippingInfo"))
    //   : {},
  },
  request: {
    requestDocuments: localStorage.getItem("requestDocuments")
      ? JSON.parse(localStorage.getItem("requestDocuments"))
      : [],
    // shippingInfo: localStorage.getItem("shippingInfo")
    //   ? JSON.parse(localStorage.getItem("shippingInfo"))
    //   : {},
  },
};



const middlware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlware))
);

export default store;
