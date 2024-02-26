import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  allOrders,
  clearErrors,
  deleteOrder,
} from "../../actions/orderActions";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";

const OrdersList = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const { loading, error, orders } = useSelector((state) => state.allOrders);
  const { isDeleted } = useSelector((state) => state.order);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(""); // State for selected status filter
  const [selectedProduct, setSelectedProduct] = useState("");

  const errMsg = (message = "") =>
    toast.error(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  const successMsg = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  useEffect(() => {
    dispatch(allOrders());

    if (error) {
      errMsg(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      successMsg("Order deleted successfully");
      navigate("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }
  }, [dispatch, error, navigate, isDeleted]);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };


  const getUniqueProducts = () => {
    const uniqueProducts = new Set();

    orders.forEach((order) => {
      if (order.orderItems) {
        order.orderItems.forEach((item) => {
          uniqueProducts.add(item.name);
        });
      }
    });

    return Array.from(uniqueProducts);
  };


  const setOrders = () => {
    // Filter orders based on startDate and endDate
    const filteredOrders = orders.filter((order) => {
      const orderDate = new Date(order.createdAt);
      return (
        (!startDate || orderDate >= startDate) &&
        (!endDate || orderDate <= endDate)
      );
    });

    // Filter orders based on status
    const statusFilteredOrders = selectedStatus
      ? filteredOrders.filter(
        (order) =>
          order.orderStatus &&
          String(order.orderStatus).includes(selectedStatus)
      )
      : filteredOrders;

    // Filter requests based on selected document
    const productFilteredOrders = selectedProduct
      ? statusFilteredOrders.filter((order) =>
        order.orderItems.some((item) => item.name === selectedProduct)
      )
      : statusFilteredOrders;

    const sortedFilteredOrders = [...productFilteredOrders].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    sortedFilteredOrders.reverse();

    const data = {
      columns: [


        {
          label: "User Last Name",
          field: "userLastName",
          sort: "asc",
        },

        {
          label: "No of Items",

          field: "numofItems",

          sort: "asc",
        },

        {
          label: "Ordered Merchandise",
          field: "orderedMerch",
          sort: "asc",
        },

        {
          label: "Amount",

          field: "amount",

          sort: "asc",
        },

        {
          label: "Created Date",

          field: "createdAt",

          sort: "asc",
        },

        {
          label: "Release of Order",

          field: "dateRelease",

          sort: "asc",
        },
        {
          label: "Reference Number",

          field: "referenceNumber",

          sort: "asc",
        },


        {
          label: "Gcash ScreenShot",

          field: "screenShot",

          sort: "asc",
        },

        {
          label: "Status",

          field: "status",

          sort: "asc",
        },

        {
          label: "Actions",

          field: "actions",
        },
      ],

      rows: [],
    };


    sortedFilteredOrders.forEach((order) => {
      const formattedCreatedDate = order.createdAt
        ? new Date(order.createdAt).toLocaleDateString()
        : "N/A";

      const orderedMerch =
        order.orderItems &&
        order.orderItems.length > 0 &&
        order.orderItems.map((item) => item.name).join(", ");

      const formattedReleaseDate = order.dateRelease
        ? new Date(order.dateRelease).toLocaleDateString()
        : "N/A";

      data.rows.push({


        userLastName: order.user.lastname,

        numofItems: order.orderItems.length,

        orderedMerch: orderedMerch || "N/A",

        amount: `₱${order.totalPrice}`,

        createdAt: formattedCreatedDate,

        dateRelease: formattedReleaseDate,

        referenceNumber: order.referenceNumber || "N/A",

        screenShot: (
          order.screenShot && order.screenShot.length > 0 ? (
            <a href={order.screenShot[0].url} target="_blank" rel="noopener noreferrer">
              <img
                src={order.screenShot[0].url}
                alt={order.orderItems}
                className="screenShot-image"
                style={{ width: "80px", height: "80px" }}
              />
            </a>
          ) : (
            "N/A"
          )
        ),

        status:
          order.orderStatus &&
            String(order.orderStatus).includes("Received") ? (
            <p style={{ color: "green" }}>{order.orderStatus}</p>
          ) : (
            <p style={{ color: "red" }}>{order.orderStatus}</p>
          ),

        actions: (
          <Fragment>
            <Link
              to={`/admin/order/${order._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-eye"></i>
            </Link>

            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deleteOrderHandler(order._id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </Fragment>
        ),
      });
    });

    return data;
  };

  return (
    <Fragment>
      <MetaData title={"All Orders"} />

      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            <h1 className="my-5">All Orders</h1>

            {/* Add date and status filters here */}
            <div className="row my-4">
              <div className="col-md-6">
                <h4 className="my-5">Filtered by Date</h4>
                <label>Start Date: </label>
                <input
                  type="date"
                  onChange={(e) => setStartDate(new Date(e.target.value))}
                />
                <label className="ml-3">End Date: </label>
                <input
                  type="date"
                  onChange={(e) => setEndDate(new Date(e.target.value))}
                />
              </div>

              <div className="col-md-6">
                <h4 className="my-5">Filtered by Status</h4>
                <label>Status: </label>
                <select
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  value={selectedStatus}
                >
                  <option value="">All</option>
                  <option value="Processing">Processing</option>
                  <option value="Approved">Approved</option>
                  <option value="Received">Received</option>
                  {/* Add other status options as needed */}
                </select>
              </div>
            </div>

            <div className="row my-4">
              <div className="col-md-6">
                <h4 className="my-5">Filtered by Products</h4>
                <label>Product: </label>
                <select
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  value={selectedProduct}
                >
                  <option value="">All</option>
                  {getUniqueProducts().map((product, index) => (
                    <option key={index} value={product}>
                      {product}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setOrders()}
                className="px-3"
                bordered
                striped
                hover
              />
            )}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default OrdersList;
