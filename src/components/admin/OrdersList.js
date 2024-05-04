import React, { Fragment, useState, useEffect, useRef } from "react";
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

import { PDFExport, savePDF } from "@progress/kendo-react-pdf";

const OrdersList = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const { loading, error, orders } = useSelector((state) => state.allOrders);
  const { isDeleted } = useSelector((state) => state.order);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [showProductFilter, setShowProductFilter] = useState(false);
  const [showGradeFilter, setShowGradeFilter] = useState(false);
  const [showStatusFilter, setShowStatusFilter] = useState(false);

  const pdfExportComponent = useRef(null);
  const contentArea = useRef(null);

  const handleExportWithComponent = () => {
    pdfExportComponent.current.save();
  };

  const handleExportWithMethod = () => {
    savePDF(contentArea.current, { paperSize: "A4" });
  };

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
          uniqueProducts.add(item.productName);
        });
      }
    });

    return Array.from(uniqueProducts);
  };

  const toggleDateFilter = () => {
    setShowDateFilter(!showDateFilter);
  };

  const toggleProductFilter = () => {
    setShowProductFilter(!showProductFilter);
  };

  const toggleGradeFilter = () => {
    setShowGradeFilter(!showGradeFilter);
  };

  const toggleStatusFilter = () => {
    setShowStatusFilter(!showStatusFilter);
  };

  const setOrders = () => {
    const filteredOrders = orders.filter((order) => {
      const orderDate = new Date(order.createdAt);
      return (
        (!startDate || orderDate >= startDate) &&
        (!endDate || orderDate <= endDate)
      );
    });

    const statusFilteredOrders = selectedStatus
      ? filteredOrders.filter(
        (order) =>
          order.orderStatus &&
          String(order.orderStatus).includes(selectedStatus)
      )
      : filteredOrders;

    const productFilteredOrders = selectedProduct
      ? statusFilteredOrders.filter((order) =>
        order.orderItems.some((item) => item.name === selectedProduct)
      )
      : statusFilteredOrders;

    const gradeFilteredOrders = selectedGrade
      ? productFilteredOrders.filter((order) => {
        const userGrade = parseInt(order.grade, 10);
        const selectedGradeNum = parseInt(selectedGrade, 10) || 0;

        return userGrade >= selectedGradeNum;
      })
      : productFilteredOrders;

    const sortedFilteredOrders = [...gradeFilteredOrders].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    sortedFilteredOrders.reverse();

    const data = {
      columns: [
        // {
        //   label: "Order ID",
        //   field: "id",
        //   sort: "asc",
        // },
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
        order.orderItems.map((item) => item.productName).join(", ");

      const formattedReleaseDate = order.dateRelease
        ? new Date(order.dateRelease).toLocaleDateString()
        : "N/A";

      data.rows.push({
        // id: order._id,
        userLastName: order.user?.lastname,
        numofItems: order.orderItems.length,
        orderedMerch: orderedMerch || "N/A",
        amount: `₱${order.totalPrice}`,
        createdAt: formattedCreatedDate,
        dateRelease: formattedReleaseDate,
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
        <div className="col-12 col-md-1">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            <h1 className="my-5">All Orders</h1>

            <div className="row my-4">
              <div className="col-md-3">
                <button className="toggle-button" onClick={toggleDateFilter}>
                  Filtered by Date
                </button>
                <br />
                <br />
                {showDateFilter && (
                  <div className="date-input-section" style={{ marginLeft: '30px', fontWeight: "bold" }}>
                    <div>
                      <label style={{ marginRight: "5px" }}>Start Date: </label>
                      <input
                        style={{ fontWeight: "bold" }}
                        type="date"
                        onChange={(e) =>
                          setStartDate(new Date(e.target.value))
                        }
                      />
                    </div>
                    <div className="mt-3">
                      <label style={{ marginRight: "10px" }}>End Date: </label>
                      <input
                        style={{ fontWeight: "bold" }}
                        type="date"
                        onChange={(e) => setEndDate(new Date(e.target.value))}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="col-md-3">
                <button
                  className="toggle-button"
                  onClick={toggleProductFilter}
                >
                  Filtered by Products
                </button>
                <br />
                <br />
                {showProductFilter && (
                  <div className="product-input-section" style={{ marginLeft: '80px', fontWeight: "bold" }}>
                    <label style={{ marginRight: "10px" }}>Product: </label>
                    <select
                      style={{ fontWeight: "bold" }}
                      onChange={(e) =>
                        setSelectedProduct(e.target.value)
                      }
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
                )}
              </div>

              <div className="col-md-3">
                <button className="toggle-button" onClick={toggleGradeFilter}>
                  Filtered by Grade
                </button>
                <br />
                <br />
                {showGradeFilter && (
                  <div className="grade-input-section" style={{ marginLeft: '70px', fontWeight: "bold" }}>
                    <label style={{ marginRight: "10px" }}>Grade: </label>
                    <select
                      style={{ fontWeight: "bold" }}
                      onChange={(e) => setSelectedGrade(e.target.value)}
                      value={selectedGrade}
                    >
                      <option value="">All</option>
                      <option value="7">Grade 7</option>
                      <option value="8">Grade 8</option>
                      <option value="9">Grade 9</option>
                      <option value="10">Grade 10</option>
                      <option value="11">Grade 11</option>
                      <option value="12">Grade 12</option>
                    </select>
                  </div>
                )}
              </div>


              <div className="col-md-3">
                <button
                  className="toggle-button"
                  onClick={toggleStatusFilter}
                >
                  Filtered by Status
                </button>
                <br />
                <br />
                {showStatusFilter && (
                  <div className="status-input-section" style={{ marginLeft: '70px', fontWeight: "bold" }}>
                    <label style={{ marginRight: "5px" }}>Status: </label>
                    <select
                      style={{ fontWeight: "bold" }}
                      onChange={(e) =>
                        setSelectedStatus(e.target.value)
                      }
                      value={selectedStatus}
                    >
                      <option value="">All</option>
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Received">Received</option>
                    </select>
                  </div>
                )}
              </div>
            </div>

            <button onClick={handleExportWithMethod}>Download Reports</button>

            <PDFExport ref={pdfExportComponent}>
              <div ref={contentArea}>
                {loading ? (
                  <Loader />
                ) : (
                  <MDBDataTable
                    data={setOrders()}
                    className="px-3 custom-mdb-datatable"
                    bordered
                    striped
                    hover
                    noBottomColumns
                    responsive
                    searching={false}
                    entriesLabel="Show entries"
                    entriesOptions={[10, 20, 30, 40, 50, 100, 200, 300]}
                    infoLabel={["Showing", "to", "of", "entries"]}
                    paginationLabel={["Previous", "Next"]}
                    responsiveSm
                    responsiveMd
                    responsiveLg
                    responsiveXl
                    noRecordsFoundLabel="No records found"
                    paginationRowsPerPageOptions={[10, 20, 30]}
                    pagingTop
                    pagingBottom
                    paginationLabels={["Previous", "Next"]}
                    style={{
                      fontSize: "16px",
                      fontFamily: "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif",
                    }}
                    tbodyTextBlack
                    tbodyBorderY
                    tbodyBorderX
                    tbodyBorderBottom
                    tbodyBorderTop
                  />
                )}
              </div>
            </PDFExport>

          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default OrdersList;
