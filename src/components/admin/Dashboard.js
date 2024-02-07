import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import "../../App.css";
import UserSalesChart from "./UserSalesChart";
import MonthlySalesChart from "./MonthlySalesChart";
import ProductSalesChart from "./ProductSalesChart";
import MonthlyRequestsChart from "./MonthlyRequestsChart";
import UserRequestsChart from "./UserRequestsChart";
import DocumentSalesChart from "./DocumentSalesChart";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProducts } from "../../actions/productActions";
import { getAdminDocuments } from "../../actions/documentActions";
import { allOrders } from "../../actions/orderActions";
import { allRequests } from "../../actions/inquiriesActions";
import { allUsers, userSales, userRequests } from "../../actions/userActions";
import { monthlySalesChart, productSalesChart, monthlyRequestsChart, documentSalesChart } from "../../actions/chartActions";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { users } = useSelector((state) => state.allUsers);
  const { documents } = useSelector((state) => state.documents);
  const { requests, totalARequest } = useSelector((state) => state.allRequests);
  const { orders, totalAmount, loading } = useSelector((state) => state.allOrders);
  const { customerSales } = useSelector((state) => state.customerSales);
  const { salesPerMonth } = useSelector((state) => state.salesPerMonth);
  const { productSales } = useSelector((state) => state.productSales);
  const { requestsPerMonth } = useSelector((state) => state.requestsPerMonth)
  const { documentSales } = useSelector((state) => state.documentSales);
  const { customerRequests } = useSelector((state) => state.customerRequests);
  let outOfStock = 0;

  products.forEach((product) => {
    if (product.stock === 0) {
      outOfStock += 1;
    }
  });

  useEffect(() => {
    dispatch(getAdminProducts());
    dispatch(getAdminDocuments());
    dispatch(allOrders());
    dispatch(allUsers());
    dispatch(userSales());
    dispatch(allRequests());
    dispatch(monthlySalesChart());
    dispatch(productSalesChart());
    dispatch(monthlyRequestsChart());
    dispatch(documentSalesChart());
    dispatch(userRequests());
  }, [dispatch]);

  return (
    <Fragment>
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <h1 className="my-4">Dashboard</h1>

          {false ? (
            <Loader />
          ) : (
            <Fragment>
              <MetaData title={"Admin Dashboard"} />

              <div className="row pr-4">
                <div className="col-xl-12 col-sm-12 mb-3">
                  <div className="card text-white bg-primary o-hidden h-100">
                    <div className="card-body">
                      <div className="text-center card-font-size">
                        Total Amount
                        <br /> <b>${totalAmount && totalAmount.toFixed(2)}</b>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row pr-4">

                <div className="col-xl-3 col-sm-6 mb-3">
                  <div className="card text-white bg-secondary o-hidden h-100">
                    <div className="card-body">
                      <div className="text-center card-font-size">
                        Documents
                        <br /> <b>{documents && documents.length}</b>
                      </div>
                    </div>
                    <Link
                      className="card-footer text-white clearfix small z-1"
                      to="/admin/documents"
                    >
                      <span className="float-left">View Details</span>
                      <span className="float-right">
                        <i className="fa fa-angle-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>

                <div className="col-xl-3 col-sm-6 mb-3">
                  <div className="card text-black bg-cyan o-hidden h-100">
                    <div className="card-body">
                      <div className="text-center card-font-size">
                        Requests
                        <br /> <b>{requests && requests.length}</b>
                      </div>
                    </div>
                    <Link
                      className="card-footer text-black clearfix small z-1"
                      to="/admin/requests"
                    >
                      <span className="float-left">View Details</span>
                      <span className="float-right">
                        <i className="fa fa-angle-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>

                <div className="col-xl-3 col-sm-6 mb-3">
                  <div className="card text-white bg-success o-hidden h-100">
                    <div className="card-body">
                      <div className="text-center card-font-size">
                        Products
                        <br /> <b>{products && products.length}</b>
                      </div>
                    </div>
                    <Link
                      className="card-footer text-white clearfix small z-1"
                      to="/admin/products"
                    >
                      <span className="float-left">View Details</span>
                      <span className="float-right">
                        <i className="fa fa-angle-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>

                <div className="col-xl-3 col-sm-6 mb-3">
                  <div className="card text-white bg-danger o-hidden h-100">
                    <div className="card-body">
                      <div className="text-center card-font-size">
                        Orders
                        <br /> <b>{orders && orders.length}</b>
                      </div>
                    </div>
                    <Link
                      className="card-footer text-white clearfix small z-1"
                      to="/admin/orders"
                    >
                      <span className="float-left">View Details</span>
                      <span className="float-right">
                        <i className="fa fa-angle-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>

                <div className="col-xl-3 col-sm-6 mb-3">
                  <div className="card text-white bg-info o-hidden h-100">
                    <div className="card-body">
                      <div className="text-center card-font-size">
                        Users
                        <br /> <b>{users && users.length}</b>
                      </div>
                    </div>
                    <Link
                      className="card-footer text-white clearfix small z-1"
                      to="/admin/users"
                    >
                      <span className="float-left">View Details</span>
                      <span className="float-right">
                        <i className="fa fa-angle-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>

                <div className="col-xl-3 col-sm-6 mb-3">
                  <div className="card text-white bg-warning o-hidden h-100">
                    <div className="card-body">
                      <div className="text-center card-font-size">
                        Out of Stock
                        <br /> <b>{outOfStock}</b>
                      </div>
                    </div>
                  </div>
                </div>
              </div>



              <div className="row">
                <div className="col-md-4">
                  <div className="card text-center card-font-size chart-card">
                    <div className="card-body">
                      <div className="text-center card-font-size">Monthly Requests</div>
                      <MonthlyRequestsChart data={requestsPerMonth} />
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="card text-center card-font-size chart-card">
                    <div className="card-body">
                      <div className="text-center card-font-size">Document Requests</div>
                      <DocumentSalesChart data={documentSales} />
                    </div>
                  </div>
                </div>


                <div className="col-md-4">
                  <div className="card text-center card-font-size chart-card">
                    <div className="card-body">
                      <div className="text-center card-font-size">Users Requests</div>
                      <UserRequestsChart data={customerRequests} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="card text-center card-font-size chart-card">
                    <div className="card-body">
                      <div className="text-center card-font-size">Customer Sales</div>
                      <UserSalesChart data={customerSales} />
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card text-center card-font-size chart-card">
                    <div className="card-body">
                      <div className="text-center card-font-size">Monthly Sales</div>
                      <MonthlySalesChart data={salesPerMonth} />
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card text-center card-font-size chart-card">
                    <div className="card-body">
                      <div className="text-center card-font-size">Product Sales</div>
                      <ProductSalesChart data={productSales} />
                    </div>
                  </div>
                </div>
              </div>


            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
