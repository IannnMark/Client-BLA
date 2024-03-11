import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/Home";
import Index from "../src/components/document/DocumentIndex";
import ProductDetails from "./components/product/ProductDetails";
import DocumentDetails from "./components/document/DocumentDetails";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import { loadUser } from "./actions/userActions";
import { useSelector } from "react-redux";
import Profile from "./components/user/Profile";
import ProtectedRoute from "./components/route/ProtectedRoute";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import NewPassword from "./components/user/NewPassword";
import store from "./store";
import Cart from "./components/cart/Cart";
import Request from "./components/request/Request";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import Payment from "./components/cart/Payment";
import OrderSuccess from "./components/cart/OrderSuccess";
import ListOrders from "./components/order/ListOrders";
import OrderDetails from "./components/order/OrderDetails";
import Dashboard from "./components/admin/Dashboard";
import ProductsList from "./components/admin/ProductsList";
import NewProduct from "./components/admin/NewProduct";
import UpdateProduct from "./components/admin/UpdateProduct";
import UpdateDocument from "./components/admin/UpdateDocument";
import DocumentList from "./components/admin/DocumentsList";
import NewDocument from "./components/admin/NewDocument";
import OrdersList from "./components/admin/OrdersList";
import RequestsList from "./components/admin/RequestsList";
import RequestsLists from "./components/guidance/RequestsList";
import RequestsListss from "./components/cashier/RequestsList";
import ProcessOrder from "./components/admin/ProcessOrder";
import UsersList from "./components/admin/UsersList";
import UpdateUser from "./components/admin/UpdateUser";
import ProductReviews from "./components/admin/ProductReviews";
import ListRequests from "./components/inquiries/ListRequests";
import RequestDetails from "./components/inquiries/RequestDetails";
import Bayad from "./components/request/Bayad";
import ConfirmRequest from "./components/request/ConfirmRequest";
import RequestSuccess from "./components/request/RequestSuccess";
import ProcessRequest from "./components/admin/ProcessRequest";
import ProcessRequests from "./components/guidance/ProcessRequests";
import ProcessRequestss from "./components/cashier/ProcessRequests";
import NewViolation from "./components/guidance/NewViolation";
import ViolationsList from "./components/guidance/ViolationsList";
import UpdateViolation from "./components/guidance/UpdateViolation";
import NewBalance from "./components/cashier/NewBalance";
import BalanceList from "./components/cashier/BalanceList";
import AboutUs from "./components/layout/aboutUs";
import UpdateBalance from "./components/cashier/UpdateBalance";
import Announcement from "./components/layout/announcement";
import NewClearance from "./components/user/NewClearance";
import ClearanceList from "./components/guidance/ClearanceList";
import ClearanceLists from "./components/user/ClearanceList";
import StockHistory from "./components/admin/StockHistory";




function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Index />} exact="true" />
        <Route path="/search/:keyword" element={<Home />} exact="true" />
        {/* <Route path="/search/:keyword" element={<Index />} exact="true" /> */}
        <Route path="/products" element={<Home />} exact="true" />
        <Route path="/aboutUs" element={<AboutUs />} exact="true" />
        <Route path="/announcement" element={<Announcement />} exact="true" />
        <Route path="/product/:id" element={<ProductDetails />} exact="true" />
        <Route path="/document/:id" element={<DocumentDetails />} exact="true" />
        <Route path="/login" element={<Login />} exact="true" />
        <Route path="/register" element={<Register />} exact="true" />
        <Route path="/me" element={<Profile />} exact="true" />
        <Route
          path="/me"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/me/update"
          element={
            <ProtectedRoute>
              <UpdateProfile />
            </ProtectedRoute>
          }
          exact="true"
        />
        <Route
          path="/password/update"
          element={
            <ProtectedRoute>
              <UpdatePassword />
            </ProtectedRoute>
          }
          exact="true"
        />
        <Route
          path="/password/forgot"
          element={<ForgotPassword />}
          exact="true"
        />
        <Route
          path="/password/reset/:token"
          element={<NewPassword />}
          exact="true"
        />
        <Route
          path="/confirm"
          element={
            <ProtectedRoute>
              <ConfirmOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/success"
          element={
            <ProtectedRoute>
              <OrderSuccess />
            </ProtectedRoute>
          }
        />

        <Route
          path="/confirm-request"
          element={
            <ProtectedRoute>
              <ConfirmRequest />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payments"
          element={
            <ProtectedRoute>
              <Bayad />
            </ProtectedRoute>
          }
        />
        <Route
          path="/request-success"
          element={
            <ProtectedRoute>
              <RequestSuccess />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders/me"
          element={
            <ProtectedRoute>
              <ListOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order/:id"
          element={
            <ProtectedRoute>
              <OrderDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/requests/me"
          element={
            <ProtectedRoute>
              <ListRequests />
            </ProtectedRoute>
          }
        />
        <Route
          path="/request/:id"
          element={
            <ProtectedRoute>
              <RequestDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAdmin={true}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/documents"
          element={
            <ProtectedRoute isAdmin={true}>
              <DocumentList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/document"
          element={
            <ProtectedRoute isAdmin={true}>
              <NewDocument />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/products"
          element={
            <ProtectedRoute isAdmin={true}>
              <ProductsList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/product"
          element={
            <ProtectedRoute isAdmin={true}>
              <NewProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/product/:id"
          element={
            <ProtectedRoute isAdmin={true}>
              <UpdateProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/document/:id"
          element={
            <ProtectedRoute isAdmin={true}>
              <UpdateDocument />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute isAdmin={true}>
              <OrdersList />
            </ProtectedRoute>
          }
          exact="true"
        />

        <Route
          path="/admin/requests"
          element={
            <ProtectedRoute isAdmin={true}>
              <RequestsList />
            </ProtectedRoute>
          }
          exact="true"
        />

        <Route
          path="/guidance/requests"
          element={
            <ProtectedRoute isGuidance={true}>
              <RequestsLists />
            </ProtectedRoute>
          }
          exact="true"
        />

        <Route
          path="/cashier/requests"
          element={
            <ProtectedRoute isCashier={true}>
              <RequestsListss />
            </ProtectedRoute>
          }
          exact="true"
        />

        <Route
          path="/admin/order/:id"
          element={
            <ProtectedRoute isAdmin={true}>
              <ProcessOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/request/:id"
          element={
            <ProtectedRoute isAdmin={true}>
              <ProcessRequest />
            </ProtectedRoute>
          }
        />

        <Route
          path="/guidance/request/:id"
          element={
            <ProtectedRoute isGuidance={true}>
              <ProcessRequests />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cashier/request/:id"
          element={
            <ProtectedRoute isCashier={true}>
              <ProcessRequestss />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute isAdmin={true}>
              <UsersList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/user/:id"
          element={
            <ProtectedRoute isAdmin={true}>
              <UpdateUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/reviews"
          element={
            <ProtectedRoute isAdmin={true}>
              <ProductReviews />
            </ProtectedRoute>
          }
          exact="true"
        />

        <Route
          path="/guidance/violation"
          element={
            <ProtectedRoute isGuidance={true}>
              <NewViolation />
            </ProtectedRoute>
          }
        />

        <Route
          path="/guidance/violations"
          element={
            <ProtectedRoute isGuidance={true}>
              <ViolationsList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/guidance/violation/:id"
          element={
            <ProtectedRoute isGuidance={true}>
              <UpdateViolation />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cashier/balance"
          element={
            <ProtectedRoute isCashier={true}>
              <NewBalance />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cashier/balances"
          element={
            <ProtectedRoute isCashier={true}>
              <BalanceList />
            </ProtectedRoute>
          }
        />


        <Route
          path="/cashier/balance/:id"
          element={
            <ProtectedRoute isCashier={true}>
              <UpdateBalance />
            </ProtectedRoute>
          }
        />


        <Route
          path="/clearance/new"
          element={
            <ProtectedRoute>
              <NewClearance />
            </ProtectedRoute>
          }
        />

        <Route
          path="/guidance/clearance"
          element={
            <ProtectedRoute isGuidance={true}>
              <ClearanceList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/clearance"
          element={
            <ProtectedRoute>
              <ClearanceLists />
            </ProtectedRoute>
          }
        />



        <Route
          path="/admin/stock-history"
          element={
            <ProtectedRoute isAdmin={true}>
              <StockHistory />
            </ProtectedRoute>
          }
        />

        <Route path="/cart" element={<Cart />} exact="true" />
        <Route path="/request" element={<Request />} exact="true" />
      </Routes>
      {!loading && (!isAuthenticated || user.role !== "admin") && <Footer />};
    </div>
  );
}

export default App;

